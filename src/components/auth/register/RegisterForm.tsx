import React, { useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { routes } from 'common/routes'
import { register } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import { customValidators } from 'common/form/useForm'
import FormInput from 'components/common/form/FormInput'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors } from 'common/api-errors'
import { RegisterFormData, RegisterResponse } from 'gql/auth'

const validationSchema: yup.SchemaOf<RegisterFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: yup.string().min(3).max(10), // .required(),
    lastName: yup.string().min(3).max(10), // .required(),
    email: yup.string().email(), // .required(),
    csrfToken: yup.string(), // .required(),
    password: yup.string().min(6, customValidators.passwordMin), // .required(),
  })

const defaults: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  csrfToken: '',
}
export type RegisterFormProps = { initialValues?: RegisterFormData; csrfToken: string }

export default function RegisterForm({ csrfToken, initialValues = defaults }: RegisterFormProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const mutation = useMutation<
    AxiosResponse<RegisterResponse>,
    AxiosError<ApiErrors>,
    RegisterFormData
  >({
    mutationFn: register,
    onError: () => AlertStore.show(t('auth:alerts.invalid-registration'), 'error'),
    onSuccess: () => AlertStore.show(t('auth:alerts.welcome'), 'success'),
  })
  const onSubmit = async (values: RegisterFormData) => {
    setLoading(true)
    try {
      const response = await mutation.mutateAsync(values)
      // eslint-disable-next-line no-debugger
      debugger
      console.log(response)
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
        <Grid item xs={12} sm={6}>
          <FormTextField type="text" label="auth:fields.first-name" name="firstName" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField type="text" label="auth:fields.last-name" name="lastName" />
        </Grid>
        <Grid item xs={12}>
          <FormTextField type="text" label="auth:fields.email" name="email" />
        </Grid>
        <Grid item xs={12}>
          <FormTextField type="password" label="auth:fields.password" name="password" />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.register" loading={loading} />
        </Grid>
      </Grid>
    </GenericForm>
  )
}
