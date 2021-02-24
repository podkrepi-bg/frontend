import React from 'react'
import { FormikValues } from 'formik'
import { TextField } from '@material-ui/core'
import { TFunction } from 'react-i18next'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'
import { useFormContext } from 'components/common/form/FormContext'

export type RegisterFormProps = {
  type: string
  label: string
  name: string
  translate: TFunction
}

export default function FormTextField<T extends FormikValues>({
  type,
  label,
  name,
  translate,
}: RegisterFormProps) {
  const { formik } = useFormContext<T>()
  const helperText = formik.touched[name]
    ? translateError(formik.errors[name] as TranslatableField, translate)
    : ''
  return (
    <TextField
      type={type}
      fullWidth
      label={translate(label)}
      name={name}
      size="small"
      variant="outlined"
      error={Boolean(formik.errors[name]) && Boolean(formik.touched[name])}
      helperText={helperText}
      value={formik.values[name]}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
    />
  )
}
