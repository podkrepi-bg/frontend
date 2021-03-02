import React, { useState } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { Grid } from '@material-ui/core'
import { AlertStore } from 'stores/AlertStore'

import { customValidators } from 'common/form/useForm'
import SubmitButton from 'components/common/form/SubmitButton'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'

export type LoginFormData = {
  email: string
  password: string
}

const validationSchema: yup.SchemaOf<LoginFormData> = yup
  .object()
  .defined()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(6, customValidators.passwordMin).required(),
  })

const defaults: LoginFormData = {
  email: '',
  password: '',
}

export type LoginFormProps = { initialValues?: LoginFormData }

export default function LoginForm({ initialValues = defaults }: LoginFormProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (values: LoginFormData) => {
    try {
      setLoading(true)

      const response = await fetch('/api/timeout', {
        method: 'POST',
        body: values && JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })

      if (response.status !== 200) {
        throw new Error(response.statusText)
      }
      AlertStore.show(t('auth:alerts.welcome'), 'success')
      setLoading(false)
    } catch (error) {
      console.error(error)
      AlertStore.show(t('auth:alerts.invalid-login'), 'error')
      setLoading(false)
    }
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
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
      </Grid>
    </GenericForm>
  )
}
