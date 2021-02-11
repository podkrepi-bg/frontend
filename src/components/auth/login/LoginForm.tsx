import React, { useState } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Grid, TextField } from '@material-ui/core'

import { AlertStore } from 'stores/AlertStore'
import SubmitButton from 'components/common/form/SubmitButton'
import useForm, { translateError, customValidators } from 'common/form/useForm'

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

  const { formik } = useForm({ initialValues, onSubmit, validationSchema })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            type="text"
            fullWidth
            label={t('auth:fields.email')}
            name="email"
            size="small"
            variant="outlined"
            autoFocus
            error={Boolean(formik.errors.email)}
            helperText={translateError(formik.errors.email)}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            fullWidth
            label={t('auth:fields.password')}
            name="password"
            size="small"
            variant="outlined"
            error={Boolean(formik.errors.password)}
            helperText={translateError(formik.errors.password)}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.login" loading={loading} />
        </Grid>
      </Grid>
    </form>
  )
}
