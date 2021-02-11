import React from 'react'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Grid, TextField, Button } from '@material-ui/core'

import { AlertStore } from 'stores/AlertStore'
import useForm, { translateError } from 'common/form/useForm'

export type LoginFormData = {
  email: string
  password: string
}

const validationSchema: yup.SchemaOf<LoginFormData> = yup
  .object()
  .defined()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(6, 'validation:password-min').required(),
  })

const defaults: LoginFormData = {
  email: '',
  password: '',
}

export type LoginFormProps = { initialValues?: LoginFormData }

export default function LoginForm({ initialValues = defaults }: LoginFormProps) {
  const { t } = useTranslation()

  const onSubmit = (values: LoginFormData) => {
    console.log(values)
    AlertStore.show(t('auth:alerts.invalid-login'), 'error')
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
          <Button fullWidth type="submit" color="primary" variant="contained">
            {t('auth:cta.login')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
