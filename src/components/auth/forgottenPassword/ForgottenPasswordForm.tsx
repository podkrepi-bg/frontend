import React from 'react'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Typography, Grid, TextField, Button } from '@material-ui/core'

import useForm, { translateError } from 'common/form/useForm'

export type ForgottenPasswordForm = {
  email: string
}

const validationSchema: yup.SchemaOf<ForgottenPasswordForm> = yup.object().defined().shape({
  email: yup.string().email().required(),
})

const defaults: ForgottenPasswordForm = {
  email: '',
}

export type ForgottenPasswordFormProps = { initialValues?: ForgottenPasswordForm }

export default function ForgottenPasswordForm({
  initialValues = defaults,
}: ForgottenPasswordFormProps) {
  const { t } = useTranslation()

  const onSubmit = (values: ForgottenPasswordForm) => {
    console.log(values)
  }

  const { formik } = useForm({ initialValues, onSubmit, validationSchema })

  return (
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
            error={Boolean(formik.errors.email)}
            helperText={translateError(formik.errors.email)}
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
  )
}
