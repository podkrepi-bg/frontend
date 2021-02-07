import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, TextField, Button, Box } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { routes } from 'common/routes'
import Layout from 'components/layout/Layout'
import Link from 'components/shared/Link'
import { AlertStore } from 'stores/AlertStore'

export default function LoginPage() {
  const { t, i18n } = useTranslation()

  yup.setLocale({
    mixed: {
      default: 'field is invalid',
      required: () => t('auth:validation.required'),
    },
    string: {
      min: ({ min }: { min: number }) => t('auth:validation.password-min', { count: min }),
      email: () => t('auth:validation.email'),
    },
  })

  const LoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values)
      AlertStore.show(t('auth:alerts.invalid-login'), 'error')
      return
    },
  })

  useEffect(() => {
    i18n.on('languageChanged', (lng) => {
      formik.validateForm()
    })
    return () => {
      i18n.off('languageChanged', (lng) => {
        return
      })
    }
  }, [formik.errors])

  return (
    <Layout title={t('nav.login')}>
      <Container maxWidth="xs">
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
              <Button fullWidth type="submit" color="primary" variant="contained">
                {t('auth:cta.login')}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justify="flex-end">
          <Box mt={2}>
            <Link href={routes.forgottenPassword}>{t('nav.forgottenPassword')}</Link>
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}
