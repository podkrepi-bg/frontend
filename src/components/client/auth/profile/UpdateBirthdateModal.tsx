import * as yup from 'yup'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { Modal, Box, Grid, IconButton } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import CloseIcon from '@mui/icons-material/Close'
import { format, parse, isDate } from 'date-fns'

import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { Person, UpdateUserAccount, UpdatePerson } from 'gql/person'
import { ApiErrors } from 'service/apiErrors'
import { updateCurrentPerson } from 'common/util/useCurrentPerson'
import { AlertStore } from 'stores/AlertStore'
import FormDatePicker from 'components/common/form/FormDatePicker'
import { DATE_VALUE_FORMAT } from 'common/util/date'

const PREFIX = 'UpdateBirthdateModal'

const classes = {
  modal: `${PREFIX}-modal`,
  close: `${PREFIX}-close`,
}

const StyledModal = styled(Modal)(({ theme }) => ({
  [`& .${classes.modal}`]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    backgroundColor: '#EEEEEE',
    padding: 20,
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
  },
  [`& .${classes.close}`]: {
    position: 'absolute',
    right: '10px',
  },
}))

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, DATE_VALUE_FORMAT, new Date())

  return parsedDate
}

const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))

const validationSchema: yup.SchemaOf<Pick<UpdateUserAccount, 'birthday'>> = yup
  .object()
  .defined()
  .shape({
    birthday: yup
      .date()
      .transform(parseDateString)
      .max(maxDate, 'profile:birthdateModal.ageInvalid')
      .required(),
  })

function UpdateBirthdateModal({
  isOpen,
  handleClose,
  person,
}: {
  isOpen: boolean
  handleClose: (data?: Person) => void
  person: UpdatePerson
}) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const dateBefore18Years = new Date(new Date().setFullYear(new Date().getFullYear() - 18))

  const initialValues: Pick<UpdateUserAccount, 'birthday'> = {
    birthday: format(new Date(person.birthday ?? dateBefore18Years), DATE_VALUE_FORMAT) || '',
  }

  const mutation = useMutation<AxiosResponse<Person>, AxiosError<ApiErrors>, UpdatePerson>({
    mutationFn: updateCurrentPerson(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.success'), 'success'),
  })

  const onSubmit = async (values: Pick<UpdateUserAccount, 'birthday'>) => {
    try {
      setLoading(true)
      const birthDate = new Date(values.birthday)
      const res = await mutation.mutateAsync({ ...person, birthday: birthDate })
      handleClose(res.data)
    } catch (error) {
      handleClose()
      console.error(error)
    } finally {
      setLoading(false)
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
        <h2>{t('profile:birthdateModal.newDate')}</h2>
        <GenericForm<Pick<UpdateUserAccount, 'birthday'>>
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <FormDatePicker name="birthday" label={t('profile:birthdateModal.question')} />
            </Grid>
            <Grid item xs={6}>
              <SubmitButton fullWidth label="auth:cta.send" loading={loading} />
            </Grid>
          </Grid>
        </GenericForm>
      </Box>
    </StyledModal>
  )
}

export default UpdateBirthdateModal
