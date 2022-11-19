import * as yup from 'yup'
import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import { email, password, name } from 'common/form/validation'
import { useRegister } from 'service/auth'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import PasswordField from 'components/common/form/PasswordField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'

export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
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
    'confirm-password': yup.string().oneOf([yup.ref('password')], 'validation:password-match'),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
  })

const defaults: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
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
          <FormTextField type="text" label="auth:fields.email" name="email" autoComplete="email" />
        </Grid>
        <Grid item xs={12}>
          <PasswordField />
        </Grid>
        <Grid item xs={12}>
          <PasswordField name={'confirm-password'} label={'auth:account.confirm-password'} />
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
