import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, TextField, Button } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import { RegisterForm, ValidationSchema } from 'common/form/models'
import useFormikHook from 'common/form/useFormikHook'

export default function RegisterPage() {
  const { t } = useTranslation()

  const initialValues: RegisterForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  const onSubmitHandler = (values: RegisterForm) => {
    console.log(values)
  }

  const { formik } = useFormikHook({
    initialValues,
    onSubmitHandler,
    schema: ValidationSchema.REGISTER,
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
