import React from 'react'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'

import { TextField, TextFieldProps } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

type dateProps = {
  name: string
} & TextFieldProps

export default function SelectDate({ name, ...textFieldProps }: dateProps) {
  const { t } = useTranslation('transfer')

  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  return (
    <TextField
      {...textFieldProps}
      {...field}
      type="date"
      variant="outlined"
      fullWidth
      InputLabelProps={{ shrink: true }}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}
    />
  )
}
