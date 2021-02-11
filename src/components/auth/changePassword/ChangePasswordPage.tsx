import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, TextField, Button } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import { ChangePasswordForm, ValidationSchema } from 'common/form/models'
import useFormikHook from 'common/form/useFormikHook'

export default function ChangePasswordPage() {
  const { t } = useTranslation()

  const initialValues: ChangePasswordForm = {
    password: '',
    confirmPassword: '',
  }
  const onSubmitHandler = (values: ChangePasswordForm) => {
    console.log(values)
  }

  const { formik } = useFormikHook({
    initialValues,
    onSubmitHandler,
    schema: ValidationSchema.CHANGE_PASSWORD,
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
