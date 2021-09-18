import React from 'react'
import * as yup from 'yup'
import { Grid } from '@material-ui/core'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { baseUrl, routes } from 'common/routes'
import { customValidators } from 'common/form/useForm'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
// import FormTextField from 'components/common/form/FormTextField'

export type RegisterFormData = {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

const validationSchema: yup.SchemaOf<RegisterFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: yup.string().min(3).max(10), // .required(),
    lastName: yup.string().min(3).max(10), // .required(),
    email: yup.string().email(), // .required(),
    password: yup.string().min(6, customValidators.passwordMin), // .required(),
  })

const defaults: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}
export type RegisterFormProps = { initialValues?: RegisterFormData }

export default function RegisterForm({ initialValues = defaults }: RegisterFormProps) {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  const onSubmit = async (values: RegisterFormData) => {
    const result = await keycloak?.register({
      loginHint: values.email, // Doesn't work with registration, see https://stackoverflow.com/q/63117669/668245
      redirectUri: `${baseUrl}${routes.profile}`,
    })
    console.log(values)
    console.log({ result })
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} sm={6}>
          <FormTextField type="text" label="auth:fields.first-name" name="firstName" />
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <FormTextField type="text" label="auth:fields.last-name" name="lastName" />
        </Grid> */}
        {/* <Grid item xs={12}>
          <FormTextField type="text" label="auth:fields.email" name="email" />
        </Grid> */}
        {/* <Grid item xs={12}>
          <FormTextField type="password" label="auth:fields.password" name="password" />
        </Grid> */}
        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.register" />
        </Grid>
      </Grid>
    </GenericForm>
  )
}
