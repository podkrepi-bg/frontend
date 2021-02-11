import React from 'react'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Grid, TextField } from '@material-ui/core'

import useForm, { translateError, customValidators } from 'common/form/useForm'
import SubmitButton from 'components/common/form/SubmitButton'

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
  const { t } = useTranslation()

  const onSubmit = (values: ChangePasswordFormData) => {
    console.log(values)
  }

  const { formik } = useForm({ initialValues, onSubmit, validationSchema })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            type="password"
            name="password"
            variant="outlined"
            label={t('auth:fields.password')}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={Boolean(formik.errors.password)}
            helperText={translateError(formik.errors.password)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            type="password"
            variant="outlined"
            name="confirmPassword"
            label={t('auth:fields.confirm-password')}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            error={Boolean(formik.errors.confirmPassword)}
            helperText={translateError(formik.errors.confirmPassword)}
          />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.reset" />
        </Grid>
      </Grid>
    </form>
  )
}
