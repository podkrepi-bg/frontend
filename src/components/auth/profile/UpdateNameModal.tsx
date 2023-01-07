import { Modal, Box, Grid, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { Person, UpdateUserAccount, UpdatePerson } from 'gql/person'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { updateCurrentPerson } from 'common/util/useCurrentPerson'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'
import CloseIcon from '@mui/icons-material/Close'
import { signIn, signOut } from 'next-auth/react'
import PasswordField from 'components/common/form/PasswordField'
import { name, password } from 'common/form/validation'
import * as yup from 'yup'
import { useState } from 'react'
import { baseUrl, routes } from 'common/routes'

const PREFIX = 'UpdateNameModal'

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

const validationSchema: yup.SchemaOf<
  Pick<UpdateUserAccount, 'firstName' | 'lastName' | 'password'>
> = yup.object().defined().shape({
  firstName: name.required(),
  lastName: name.required(),
  password: password.required(),
})

const callbackUrl = `${baseUrl}${routes.login}`

function UpdateNameModal({
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

  const mutation = useMutation<AxiosResponse<Person>, AxiosError<ApiErrors>, UpdatePerson>({
    mutationFn: updateCurrentPerson(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.success'), 'success'),
  })

  const onSubmit = async (
    values: Pick<UpdateUserAccount, 'firstName' | 'lastName' | 'password'>,
  ) => {
    try {
      setLoading(true)

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

      const updateUser = await mutation.mutateAsync({
        ...person,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
      })

      const reLogin = await signIn<'credentials'>('credentials', {
        email: person.email,
        password: values.password,
        redirect: false,
      })
      if (reLogin?.error) {
        await signOut({ callbackUrl })
        AlertStore.show(t('auth:alerts.re-login'), 'info')
      }

      handleClose(updateUser.data)
    } catch (error) {
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
        <h2>{t('profile:nameModal.newName')}</h2>
        <GenericForm
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={{
            firstName: person?.firstName || '',
            lastName: person?.lastName || '',
            password: '',
          }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <FormTextField
                type="text"
                name="firstName"
                autoComplete="firstName"
                label={t('profile:nameModal.firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormTextField
                type="text"
                name="lastName"
                autoComplete="lastName"
                label={t('profile:nameModal.lastName')}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <PasswordField />
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

export default UpdateNameModal
