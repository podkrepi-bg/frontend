import { Modal, Box, Grid, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import EmailField from 'components/common/form/EmailField'
import { Person, UpdateUserAccount, UpdatePerson } from 'gql/person'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { updateCurrentPerson } from 'common/util/useCurrentPerson'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'
import CloseIcon from '@mui/icons-material/Close'
import * as yup from 'yup'
import { email, password } from 'common/form/validation'
import { signIn, signOut } from 'next-auth/react'
import PasswordField from 'components/common/form/PasswordField'
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

const validationSchema: yup.SchemaOf<Pick<UpdateUserAccount, 'email' | 'password'>> = yup
  .object()
  .defined()
  .shape({
    email: email.required(),
    password: password.required(),
  })

const callbackUrl = `${baseUrl}${routes.login}`

function UpdateEmailModal({
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

  const onSubmit = async (values: Pick<UpdateUserAccount, 'email' | 'password'>) => {
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

      values.email = values.email.trim()
      const updateUser = await mutation.mutateAsync({
        ...person,
        email: values.email,
      })

      const reLogin = await signIn<'credentials'>('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      if (reLogin?.error) {
        await signOut({ callbackUrl })
        AlertStore.show(t('auth:alerts.re-login'), 'info')
      }

      handleClose(updateUser.data)
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
        <h2>{t('profile:emailModal.newEmail')}</h2>
        <GenericForm
          onSubmit={onSubmit}
          initialValues={{ email: person?.email || '', password: '' }}
          validationSchema={validationSchema}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <EmailField name="email" label="email" />
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

export default UpdateEmailModal
