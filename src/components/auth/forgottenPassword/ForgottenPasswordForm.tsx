import React from 'react'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Typography, Grid } from '@material-ui/core'

import SubmitButton from 'components/common/form/SubmitButton'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'

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

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Typography variant="body1" paragraph>
        {t('auth:pages.forgotten-password.instructions')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormTextField type="text" label="auth:fields.email" name="email" />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.send" />
        </Grid>
      </Grid>
    </GenericForm>
  )
}
