import React from 'react'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'

import { TextField, TextFieldProps } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

export type dateProps = {
  name: string
} & TextFieldProps

export default function FormDate({ name, ...textFieldProps }: dateProps) {
  const { t } = useTranslation()
  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  textFieldProps.type = 'date'
  textFieldProps.variant = 'outlined'
  textFieldProps.fullWidth = true
  textFieldProps.InputLabelProps = { shrink: true }

  return (
    <TextField
      {...textFieldProps}
      {...field}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}
    />
  )
}
