import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, TextField, Button } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Layout from 'components/layout/Layout'

export default function ChangePasswordPage() {
  const { t } = useTranslation()

  const ChangePasswordSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, t('auth:validation.password-min', { count: 6 }))
      .required(t('auth:validation.required')),
    confirmPassword: yup
      .string()
      .required(t('auth:validation.required'))
      .oneOf([yup.ref('password'), null], t('auth:validation.password-match')),
  })

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ChangePasswordSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return
    },
  })

  return (
    <Layout title={t('nav.changePassword')}>
      <Container maxWidth="xs">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
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
              <TextField
                type="password"
                fullWidth
                label={t('auth:fields.confirm-password')}
                name="confirmPassword"
                size="small"
                variant="outlined"
                error={!!formik.errors && !!formik.errors.confirmPassword}
                helperText={formik.errors && formik.errors.confirmPassword}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth color="primary" variant="contained">
                {t('auth:cta.reset')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  )
}
