import React from 'react'
import { useField, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { TextField, TextFieldProps } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

export type selectProps = {
  label: string
  name: string
} & TextFieldProps

export default function FormSelect({ label, name, ...textFieldProps }: selectProps) {
  const { t } = useTranslation()
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldValue(name, event.target.value)
  }

  textFieldProps.size = 'small'
  textFieldProps.fullWidth = true
  textFieldProps.variant = 'outlined'

  return (
    <TextField
      {...textFieldProps}
      {...field}
      select
      onChange={handleChange}
      label={t(label)}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}
    />
  )
}
