import React, { useState } from 'react'
import * as yup from 'yup'
import { Grid2 } from '@mui/material'

import SubmitButton from 'components/common/form/SubmitButton'
import GenericForm from 'components/common/form/GenericForm'
import { routes } from 'common/routes'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import PasswordField from 'components/common/form/PasswordField'
import { resetPassword } from 'common/util/useCurrentPerson'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'
import { confirmPassword, password } from 'common/form/validation'

export type ChangePasswordFormData = {
  password: string
  confirmPassword: string
  token?: string | string[]
}

const validationSchema: yup.SchemaOf<ChangePasswordFormData> = yup
  .object()
  .defined()
  .shape({
    password: password.required(),
    confirmPassword: confirmPassword.required('validation:password-match'),
    token: yup.string(),
  })

const defaults: ChangePasswordFormData = {
  password: '',
  confirmPassword: '',
  token: '',
}

export type ChangePasswordFormProps = {
  initialValues?: ChangePasswordFormData
}

export default function ChangePasswordForm({ initialValues = defaults }: ChangePasswordFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const token = router.query.token
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse, AxiosError<ApiErrors>, ChangePasswordFormData>({
    mutationFn: resetPassword(),
    onError: () => AlertStore.show(t('auth:alerts.change-password-error'), 'error'),
    onSuccess: () => AlertStore.show(t('auth:alerts.change-password-success'), 'success'),
  })
  const onSubmit = async (values: ChangePasswordFormData) => {
    values.token = token
    try {
      setLoading(true)
      const res = await mutation.mutateAsync(values)
      if (!res) {
        throw new Error(res)
      }
      router.push(routes.login)
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
      <Grid2 container spacing={3}>
        <Grid2 size={12}>
          <PasswordField
            type="password"
            label="auth:fields.password"
            name="password"
            autoComplete="new-password"
          />
        </Grid2>
        <Grid2 size={12}>
          <PasswordField
            type="password"
            label="auth:fields.confirm-password"
            name="confirmPassword"
            autoComplete="new-password"
          />
        </Grid2>
        <Grid2 size={12}>
          <SubmitButton loading={loading} fullWidth label="auth:cta.reset" />
        </Grid2>
      </Grid2>
    </GenericForm>
  )
}
