import React from 'react'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { TextField, TextFieldProps } from '@material-ui/core'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

export type RegisterFormProps = {
  type: string
  label: string
  name: string
} & TextFieldProps

export default function FormTextField({ label, name, ...textFieldProps }: RegisterFormProps) {
  const { t } = useTranslation()
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <TextField
      fullWidth
      label={t(label)}
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}
      {...textFieldProps}
      {...field}
    />
  )
}
