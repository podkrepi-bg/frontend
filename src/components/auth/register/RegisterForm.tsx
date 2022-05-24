import * as yup from 'yup'
import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import { useRegister } from 'service/auth'
import { AlertStore } from 'stores/AlertStore'
import { customValidators } from 'common/form/useForm'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'

export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const validationSchema: yup.SchemaOf<RegisterFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: yup.string().min(3).max(10).required(),
    lastName: yup.string().min(3).max(10).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6, customValidators.passwordMin).required(),
  })

const defaults: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}
export type RegisterFormProps = { initialValues?: RegisterFormData }

export default function RegisterForm({ initialValues = defaults }: RegisterFormProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const { mutateAsync: register } = useRegister()

  const onSubmit = async (values: RegisterFormData) => {
    try {
      setLoading(true)

      // Register in Keycloak
      await register(values)

      // Authenticate
      const resp = await signIn<'credentials'>('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      if (resp?.error) {
        throw new Error(resp.error)
      }
      if (resp?.ok) {
        AlertStore.show(t('auth:alerts.welcome'), 'success')
        router.push(routes.profile.index)
      }
    } catch (error) {
      console.error(error)
      AlertStore.show(t('auth:alerts.cannot-register'), 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormTextField
            type="text"
            label="auth:fields.first-name"
            name="firstName"
            autoComplete="first-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            type="text"
            label="auth:fields.last-name"
            name="lastName"
            autoComplete="last-name"
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField type="text" label="auth:fields.email" name="email" autoComplete="email" />
        </Grid>
        <Grid item xs={12}>
          <FormTextField type="password" label="auth:fields.password" name="password" />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.register" loading={loading} />
        </Grid>
      </Grid>
    </GenericForm>
  )
}
