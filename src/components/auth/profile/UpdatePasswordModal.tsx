import { Modal, Box, Grid, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { Person, UpdateUserAccount } from 'gql/person'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { updateCurrentPersonPassword } from 'common/util/useCurrentPerson'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'
import CloseIcon from '@mui/icons-material/Close'
import PasswordField from 'components/common/form/PasswordField'
import { signIn } from 'next-auth/react'
import { customValidators } from 'common/form/validation'
import * as yup from 'yup'

const PREFIX = 'UpdateNameModal'

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

export type Credentials = {
  'previous-password': string
  password: string
}

const validationSchema: yup.SchemaOf<Pick<UpdateUserAccount, 'password'>> = yup
  .object()
  .defined()
  .shape({
    password: yup.string().min(6, customValidators.passwordMin).required(),
    'confirm-password': yup.string().oneOf([yup.ref('password')], 'Паролите не съвпадат'),
  })

function UpdatePasswordModal({
  isOpen,
  person,
  handleClose,
}: {
  isOpen: boolean
  person: Person
  handleClose: (data?: boolean) => void
}) {
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<boolean>, AxiosError<ApiErrors>, Credentials>({
    mutationFn: updateCurrentPersonPassword(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.success'), 'success')
    },
  })

  const onSubmit = async (values: Credentials) => {
    try {
      const confirmPassword = await signIn<'credentials'>('credentials', {
        email: person.email,
        password: values['previous-password'],
        redirect: false,
      })
      if (confirmPassword?.error) {
        handleClose()
        AlertStore.show(t('auth:alerts.invalid-login'), 'error')
        throw new Error('Invalid login')
      }
      const res = await mutation.mutateAsync(values)
      await signIn<'credentials'>('credentials', {
        email: person.email,
        password: values.password,
        redirect: false,
      })
      handleClose(res.data)
    } catch (error) {
      console.log('error', error)
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
        <h2>Обнови парола</h2>
        <GenericForm
          onSubmit={onSubmit}
          initialValues={{ 'previous-password': '', password: '' }}
          validationSchema={validationSchema}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <PasswordField name={'previous-password'} label={'auth:account.previous-password'} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <PasswordField name={'password'} label={'auth:account.new-password'} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <PasswordField name={'confirm-password'} label={'auth:account.confirm-password'} />
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

export default UpdatePasswordModal
