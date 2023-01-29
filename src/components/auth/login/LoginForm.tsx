import * as yup from 'yup'
import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import FormInput from 'components/common/form/FormInput'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import EmailField from 'components/common/form/EmailField'
import Google from 'common/icons/Google'
import PasswordField from 'components/common/form/PasswordField'
import { email, loginPassword } from 'common/form/validation'
import LinkButton from 'components/common/LinkButton'

export type LoginFormData = {
  email: string
  password?: string
}

const validationSchema: yup.SchemaOf<LoginFormData> = yup.object().defined().shape({
  email: email.required(),
  password: loginPassword.required(),
})

const defaults: LoginFormData = {
  email: '',
  password: '',
}

export type LoginFormProps = {
  initialValues?: LoginFormData
}

export default function LoginForm({ initialValues = defaults }: LoginFormProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const onSubmit = async (values: LoginFormData) => {
    try {
      setLoading(true)

      const resp = await signIn<'credentials'>('credentials', {
        email: values.email.trim(),
        password: values.password,
        redirect: false,
      })
      if (resp?.error) {
        throw new Error(resp.error)
      }
      if (resp?.ok) {
        setLoading(false)
        AlertStore.show(t('auth:alerts.welcome'), 'success')
        router.push(`${router.query.callbackUrl ?? routes.profile.index}`)
      }
    } catch (error) {
      console.error(error)
      AlertStore.show(t('auth:alerts.invalid-login'), 'error')
    } finally {
      setLoading(false)
    }
  }
  const onGoogleLogin = () => signIn('google')

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <FormInput type="hidden" name="csrfToken" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EmailField label="auth:fields.email" name="email" />
        </Grid>
        <Grid item xs={12}>
          <PasswordField />
        </Grid>
        <Grid container justifyContent="flex-end">
          <LinkButton href={routes.forgottenPassword}>
            {t('auth:account.forgotten-password')}
          </LinkButton>
        </Grid>
        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.login" loading={loading} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" fullWidth onClick={onGoogleLogin}>
            <Google /> {t('nav.login-with')} Google
          </Button>
        </Grid>
      </Grid>
    </GenericForm>
  )
}
