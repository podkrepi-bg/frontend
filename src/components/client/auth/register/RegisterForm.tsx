import * as yup from 'yup'
import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import { email, password, name, confirmPassword } from 'common/form/validation'
import { useRegister } from 'service/auth'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import PasswordField from 'components/common/form/PasswordField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import EmailField from 'components/common/form/EmailField'

export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
  gdpr: boolean
}

const validationSchema: yup.SchemaOf<RegisterFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: name.required(),
    lastName: name.required(),
    email: email.required(),
    password: password.required(),
    confirmPassword: confirmPassword.required('validation:password-match'),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
  })

const defaults: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
  gdpr: false,
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
      values.firstName = values.firstName.trim()
      values.lastName = values.lastName.trim()
      values.email = values.email.trim()

      // Register in Keycloak
      const registerResponse = await register(values)

      if (registerResponse.data.data?.errorMessage) {
        AlertStore.show(t('auth:alerts.duplicate-email'), 'error')
        return
      }

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
        await router.push(routes.profile.index)
      }
    } catch (error) {
      console.error(error)
      AlertStore.show(t('auth:alerts.invalid-login'), 'error')
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
          <EmailField label="auth:fields.email" name="email" />
        </Grid>
        <Grid item xs={12}>
          <PasswordField autoComplete="new-password" />
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            name="confirmPassword"
            label="auth:account.confirm-password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <AcceptTermsField name="terms" />
          <AcceptPrivacyPolicyField name="gdpr" />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.register" loading={loading} />
        </Grid>
      </Grid>
    </GenericForm>
  )
}
