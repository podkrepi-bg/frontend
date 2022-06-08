import * as yup from 'yup'
import { styled } from '@mui/material/styles'
import { Modal, Box, Grid, IconButton } from '@mui/material'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { Person, UpdateUserAccount, UpdatePerson } from 'gql/person'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { updateCurrentPerson } from 'common/util/useCurrentPerson'

import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'
import CloseIcon from '@mui/icons-material/Close'
import { format, parse, isDate } from 'date-fns'
import FormTextField from 'components/common/form/FormTextField'
import PasswordField from 'components/common/form/PasswordField'
import { signIn } from 'next-auth/react'
import { customValidators } from 'common/form/validation'

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

const formatString = 'yyyy-MM-dd'

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, formatString, new Date())

  return parsedDate
}

const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))

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

  const validationSchema: yup.SchemaOf<Pick<UpdateUserAccount, 'birthday' | 'password'>> = yup
    .object()
    .defined()
    .shape({
      birthday: yup
        .date()
        .transform(parseDateString)
        .max(maxDate, t('profile:birthdateModal.ageInvalid'))
        .required(),
      password: yup.string().min(6, customValidators.passwordMin).required(),
    })

  const dateBefore18Years = new Date(new Date().setFullYear(new Date().getFullYear() - 18))

  const initialValues: Pick<UpdateUserAccount, 'birthday' | 'password'> = {
    birthday: format(new Date(person.birthday ?? dateBefore18Years), formatString) || '',
    password: '',
  }

  const mutation = useMutation<AxiosResponse<Person>, AxiosError<ApiErrors>, UpdatePerson>({
    mutationFn: updateCurrentPerson(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.success'), 'success'),
  })

  const onSubmit = async (values: Pick<UpdateUserAccount, 'birthday' | 'password'>) => {
    try {
      const confirmPassword = await signIn<'credentials'>('credentials', {
        email: person.email,
        password: values.password,
        redirect: false,
      })
      if (confirmPassword?.error) {
        handleClose()
        AlertStore.show(t('auth:alerts.invalid-login'), 'error')
        throw new Error('Invalid login')
      }
      const birthDate = new Date(values.birthday)
      const data = await mutation.mutateAsync({ ...person, birthday: birthDate })
      await signIn<'credentials'>('credentials', {
        email: person.email,
        password: values.password,
        redirect: false,
      })
      handleClose(data.data)
    } catch (error) {
      console.error(error)
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
        <GenericForm<Pick<UpdateUserAccount, 'birthday' | 'password'>>
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <FormTextField
                type="date"
                name="birthday"
                label={t('profile:birthdateModal.question')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <PasswordField />
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

export default UpdateBirthdateModal
