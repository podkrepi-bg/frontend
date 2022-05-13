import * as yup from 'yup'
import { styled } from '@mui/material/styles'
import { Modal, Box, Grid, IconButton } from '@mui/material'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { Person, UpdatePerson } from 'gql/person'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { updateCurrentPerson } from 'common/util/useCurrentPerson'

import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'
import CloseIcon from '@mui/icons-material/Close'
import { format, parse, isDate } from 'date-fns'
import { FormikHelpers } from 'formik'
import FormTextField from 'components/common/form/FormTextField'

const PREFIX = 'UpdateBirthdayModal'

const classes = {
  modal: `${PREFIX}-modal`,
  close: `${PREFIX}-close`,
}

const StyledModal = styled(Modal)({
  [`& .${classes.modal}`]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    backgroundColor: '#EEEEEE',
    padding: 20,
  },
  [`& .${classes.close}`]: {
    position: 'absolute',
    right: '10px',
  },
})

const formatString = 'yyyy-MM-dd'

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, formatString, new Date())

  return parsedDate
}
type BirthdayFormData = {
  birthday: Date | string
}
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))

const validationSchema: yup.SchemaOf<BirthdayFormData> = yup
  .object()
  .defined()
  .shape({
    birthday: yup
      .date()
      .transform(parseDateString)
      .max(maxDate, `Трябва да си над 18 години за да може да се регистрираш.`)
      .required(),
  })

function UpdateBirthdayModal({
  isOpen,
  handleClose,
  person,
}: {
  isOpen: boolean
  handleClose: (data?: Person) => void
  person: UpdatePerson
}) {
  const { t } = useTranslation()

  const dateBefore18Years = new Date(new Date().setFullYear(new Date().getFullYear() - 18))

  const initialValues: BirthdayFormData = {
    birthday: format(new Date(person.birthday ?? dateBefore18Years), formatString),
  }

  const mutation = useMutation<AxiosResponse<Person>, AxiosError<ApiErrors>, UpdatePerson>({
    mutationFn: updateCurrentPerson(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.success'), 'success'),
  })

  const onSubmit = async (
    values: BirthdayFormData,
    { setFieldError }: FormikHelpers<BirthdayFormData>,
  ) => {
    try {
      const birthDate = new Date(values?.birthday)
      await mutation.mutateAsync({ ...person, birthday: birthDate }).then((data) => {
        handleClose(data.data)
      })
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <StyledModal
      open={isOpen}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box className={classes.modal}>
        <IconButton className={classes.close} onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
        <h2>Обнови рожден ден</h2>
        <GenericForm<BirthdayFormData>
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <FormTextField
                type="date"
                name="birthday"
                label="Кога е твоят рожден ден?"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <SubmitButton fullWidth />
            </Grid>
          </Grid>
        </GenericForm>
      </Box>
    </StyledModal>
  )
}

export default UpdateBirthdayModal
