import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, TextField, Button, Box } from '@material-ui/core'

import { routes } from 'common/routes'
import Layout from 'components/layout/Layout'
import Link from 'components/shared/Link'
import { AlertStore } from 'stores/AlertStore'
import { LoginForm, ValidationSchema } from 'common/form/models'
import useFormikHook from 'common/form/useFormikHook'

export default function LoginPage() {
  const { t } = useTranslation()

  const initialValues: LoginForm = {
    email: '',
    password: '',
  }
  const onSubmitHandler = (values: LoginForm) => {
    console.log(values)
    AlertStore.show(t('auth:alerts.invalid-login'), 'error')
  }

  const { formik } = useFormikHook({
    initialValues,
    onSubmitHandler,
    schema: ValidationSchema.LOGIN,
  })

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
