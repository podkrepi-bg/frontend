import React from 'react'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Grid, TextField, Button } from '@material-ui/core'

import useForm, { translateError, customValidators } from 'common/form/useForm'

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
  const { t } = useTranslation()

  const onSubmit = (values: RegisterFormData) => {
    console.log(values)
  }

  const { formik } = useForm({ initialValues, onSubmit, validationSchema })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            fullWidth
            label={t('auth:fields.first-name')}
            name="firstName"
            size="small"
            variant="outlined"
            autoFocus
            error={Boolean(formik.errors.firstName)}
            helperText={translateError(formik.errors.firstName)}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            fullWidth
            label={t('auth:fields.last-name')}
            name="lastName"
            size="small"
            variant="outlined"
            error={Boolean(formik.errors.lastName)}
            helperText={translateError(formik.errors.lastName)}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            fullWidth
            label={t('auth:fields.email')}
            name="email"
            size="small"
            variant="outlined"
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
          <Button type="submit" fullWidth color="primary" variant="contained">
            {t('auth:cta.register')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
