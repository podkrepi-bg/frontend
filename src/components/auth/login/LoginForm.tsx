import React, { useState } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { Grid } from '@material-ui/core'
import { signIn } from 'next-auth/client'
import { AlertStore } from 'stores/AlertStore'

import { customValidators } from 'common/form/useForm'
import SubmitButton from 'components/common/form/SubmitButton'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import FormInput from 'components/common/form/FormInput'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

export type LoginFormData = {
  email: string
  password: string
  csrfToken: string
}

const validationSchema: yup.SchemaOf<LoginFormData> = yup
  .object()
  .defined()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(6, customValidators.passwordMin).required(),
    csrfToken: yup.string().required(),
  })

const defaults: LoginFormData = {
  email: '',
  password: '',
  csrfToken: '',
}

export type LoginFormProps = {
  initialValues?: LoginFormData
  csrfToken: string
}

type LoginResponse = {
  /**
   * Will be different error codes,
   * depending on the type of error.
   */
  error: string | undefined
  /**
   * HTTP status code,
   * hints the kind of error that happened.
   */
  status: number
  /**
   * `true` if the signin was successful
   */
  ok: boolean
  /**
   * `null` if there was an error,
   * otherwise the url the user
   * should have been redirected to.
   */
  url: string | null
}

export default function LoginForm({ csrfToken, initialValues = defaults }: LoginFormProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (values: LoginFormData) => {
    AlertStore.show(t('auth:alerts.welcome'), 'success')
    try {
      setLoading(true)

      // Bad type Promise<void> of next-auth
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { error, status, ok, url }: LoginResponse = await signIn('credentials', {
        username: values.email,
        password: values.password,
        redirect: false,
      })
      console.log(values, { error, status, ok, url })
      if (ok) {
        setLoading(false)
        AlertStore.show(t('auth:alerts.welcome'), 'success')
        router.push(routes.index)
      } else {
        throw new Error(error)
      }
      // const response = await fetch('/api/timeout', {
      //   method: 'POST',
      //   body: values && JSON.stringify(values),
      //   headers: {
      //     'Content-Type': 'application/json; charset=UTF-8',
      //   },
      // })

      // if (response.status !== 200) {
      //   throw new Error(response.statusText)
      // }
    } catch (error) {
      console.error(error)
      setLoading(false)
      AlertStore.show(t('auth:alerts.invalid-login'), 'error')
    }
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
          <SubmitButton fullWidth label="auth:cta.login" loading={loading} />
        </Grid>
      </Grid>
    </GenericForm>
  )
}
