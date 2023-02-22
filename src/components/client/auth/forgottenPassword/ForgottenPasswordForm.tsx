import React, { useState } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { Typography, Grid } from '@mui/material'

import SubmitButton from 'components/common/form/SubmitButton'
import GenericForm from 'components/common/form/GenericForm'
import EmailField from 'components/common/form/EmailField'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { forgottenPassword } from 'common/util/useCurrentPerson'

export type ForgottenPasswordForm = {
  email: string
}

const validationSchema: yup.SchemaOf<ForgottenPasswordForm> = yup.object().defined().shape({
  email: yup.string().email().required(),
})

const defaults: ForgottenPasswordForm = {
  email: '',
}

export type ForgottenPasswordFormProps = {
  initialValues?: ForgottenPasswordForm
}

export default function ForgottenPasswordForm({
  initialValues = defaults,
}: ForgottenPasswordFormProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)

  const mutation = useMutation<AxiosResponse, AxiosError<ApiErrors>, ForgottenPasswordForm>({
    mutationFn: forgottenPassword(),
    onError: () => AlertStore.show(t('auth:alerts.forgotten-password-error'), 'error'),
    onSuccess: () => AlertStore.show(t('auth:alerts.forgotten-password-success'), 'success'),
  })

  const onSubmit = async (values: ForgottenPasswordForm) => {
    try {
      setLoading(true)
      values.email = values.email.trim()
      await mutation.mutateAsync(values)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
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
          <EmailField label="auth:fields.email" name="email" />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton loading={loading} fullWidth label="auth:cta.send" />
        </Grid>
      </Grid>
    </GenericForm>
  )
}
