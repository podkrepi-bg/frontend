import * as yup from 'yup'
import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { customValidators } from 'common/form/useForm'
import FormInput from 'components/common/form/FormInput'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import Google from 'common/icons/Google'

export type LoginFormData = {
  email: string
  password?: string
}

const validationSchema: yup.SchemaOf<LoginFormData> = yup
  .object()
  .defined()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(6, customValidators.passwordMin), // .required(),
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
        email: values.email,
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
  const onGoogleLogin = () => {
    const resp = signIn('google')
    console.log(resp)
  }
  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <FormInput type="hidden" name="csrfToken" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormTextField type="text" label="auth:fields.email" name="email" />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="password"
            name="password"
            autoComplete="password"
            label="auth:fields.password"
          />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.login" loading={loading} />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth onClick={onGoogleLogin}>
            <Google /> {t('auth:cta.login')}
          </Button>
        </Grid>
      </Grid>
    </GenericForm>
  )
}
