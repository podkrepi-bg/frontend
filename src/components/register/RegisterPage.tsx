import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, TextField, Button } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Layout from 'components/layout/Layout'

export default function RegisterPage() {
  const { t } = useTranslation()

  const RegisterSchema = yup.object().shape({
    firstName: yup.string().required(t('auth:validation.required')),
    lastName: yup.string().required(t('auth:validation.required')),
    email: yup.string().email(t('auth:validation.email')).required(t('auth:validation.required')),
    password: yup
      .string()
      .min(6, t('auth:validation.password-min', { count: 6 }))
      .required(t('auth:validation.required')),
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return
    },
  })

  return (
    <Layout title={t('nav.register')}>
      <Container maxWidth="xs">
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
                error={!!formik.errors && !!formik.errors.firstName}
                helperText={formik.errors && formik.errors.firstName}
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
                error={!!formik.errors && !!formik.errors.lastName}
                helperText={formik.errors && formik.errors.lastName}
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
                error={!!formik.errors && !!formik.errors.email}
                helperText={formik.errors && formik.errors.email}
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
                error={!!formik.errors && !!formik.errors.password}
                helperText={formik.errors && formik.errors.password}
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
      </Container>
    </Layout>
  )
}
