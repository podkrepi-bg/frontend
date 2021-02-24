import React from 'react'
import * as yup from 'yup'
import { Grid } from '@material-ui/core'

import { customValidators } from 'common/form/useForm'
import SubmitButton from 'components/common/form/SubmitButton'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'

export type ChangePasswordFormData = {
  password: string
  confirmPassword: string
}

const validationSchema: yup.SchemaOf<ChangePasswordFormData> = yup
  .object()
  .defined()
  .shape({
    password: yup.string().min(6, customValidators.passwordMin).required(),
    confirmPassword: yup
      .string()
      .min(6, customValidators.passwordMin)
      .required()
      .oneOf([yup.ref('password'), null], 'validation:password-match'),
  })

const defaults: ChangePasswordFormData = {
  password: '',
  confirmPassword: '',
}

export type ChangePasswordFormProps = { initialValues?: ChangePasswordFormData }

export default function ChangePasswordForm({ initialValues = defaults }: ChangePasswordFormProps) {
  const onSubmit = (values: ChangePasswordFormData) => {
    console.log(values)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormTextField type="password" label="auth:fields.password" name="password" />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="password"
            label="auth:fields.confirm-password"
            name="confirmPassword"
          />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.reset" />
        </Grid>
      </Grid>
    </GenericForm>
  )
}
