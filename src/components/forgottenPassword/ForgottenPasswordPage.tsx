import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Container, Grid, TextField, Button } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Layout from 'components/layout/Layout'

export default function ForgottenPasswordPage() {
  const { t } = useTranslation()

  const ForgottenPasswordSchema = yup.object().shape({
    email: yup.string().email(t('auth:validation.email')).required(t('auth:validation.required')),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgottenPasswordSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return
    },
  })

  return (
    <Layout title={t('nav.forgottenPassword')}>
      <Container maxWidth="xs">
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="body1" paragraph>
            {t('auth:pages.forgotten-password.instructions')}
          </Typography>
          <Grid container spacing={3}>
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
              <Button fullWidth type="submit" color="primary" variant="contained">
                {t('auth:cta.send')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  )
}
