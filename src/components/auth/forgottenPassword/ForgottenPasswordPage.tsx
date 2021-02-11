import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Container, Grid, TextField, Button } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import useFormikHook from 'common/form/useFormikHook'
import { ForgottenPasswordForm, ValidationSchema } from 'common/form/models'

export default function ForgottenPasswordPage() {
  const { t } = useTranslation()

  const initialValues: ForgottenPasswordForm = {
    email: '',
  }
  const onSubmitHandler = (values: ForgottenPasswordForm) => {
    console.log(values)
  }

  const { formik } = useFormikHook({
    initialValues,
    onSubmitHandler,
    schema: ValidationSchema.FORGOTTEN_PASSWORD,
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
