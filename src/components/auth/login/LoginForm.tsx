import React, { useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { Grid, FormControl, Typography } from '@mui/material'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { routes } from 'common/routes'
import { login } from 'common/rest'
import { customValidators } from 'common/form/useForm'
import { AlertStore } from 'stores/AlertStore'
import FormInput from 'components/common/form/FormInput'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import CheckboxField from 'components/common/form/CheckboxField'
import { ApiErrors } from 'common/api-errors'
import { LoginFormData, LoginResponse } from 'gql/auth'

const defaults: LoginFormData = {
  email: '',
  password: '',
  csrfToken: '',
}

const validationSchema: yup.SchemaOf<LoginFormData> = yup
  .object()
  .defined()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(6, customValidators.passwordMin), // .required(),
    csrfToken: yup.string(), // .required(),
  })

export type LoginFormProps = {
  initialValues?: LoginFormData
  csrfToken: string
}

export default function LoginForm({ csrfToken, initialValues = defaults }: LoginFormProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const mutation = useMutation<AxiosResponse<LoginResponse>, AxiosError<ApiErrors>, LoginFormData>({
    mutationFn: login,
    onError: () => AlertStore.show(t('auth:alerts.invalid-login'), 'error'),
    onSuccess: () => AlertStore.show(t('auth:alerts.welcome'), 'success'),
  })
  const onSubmit = async (values: LoginFormData) => {
    setLoading(true)
    try {
      const response = await mutation.mutateAsync(values)
      // eslint-disable-next-line no-debugger
      debugger
      console.log(response)

      if (response.data.error) {
        AlertStore.show(
          response.data.data.error_description || t('auth:alerts.invalid-login'),
          'error',
        )
        return
      }
    } finally {
      setLoading(false)
    }
    router.push(routes.profile)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={{ ...initialValues, csrfToken }}
      validationSchema={validationSchema}>
      <FormInput type="hidden" name="csrfToken" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormTextField type="text" label="auth:fields.email" name="email" />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="password"
            name="password"
            autoComplete="password"
            label="auth:fields.password"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <CheckboxField
              name="person.newsletter"
              label={<Typography variant="body2">{t('auth:cta.remember')}</Typography>}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.login" loading={loading} />
        </Grid>
      </Grid>
    </GenericForm>
  )
}
