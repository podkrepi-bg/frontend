import React from 'react'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { MenuItem, TextField, TextFieldProps } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

export type FormSelectFieldOption = {
  key: string
  value: string | number
  name: string
}
export type FormSelectFieldProps = {
  label: string
  name: string
  options: FormSelectFieldOption[]
} & TextFieldProps

export default function FormSelectField({
  label,
  name,
  options,
  ...textFieldProps
}: FormSelectFieldProps) {
  const { t } = useTranslation()
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <TextField
      fullWidth
      select
      label={t(label)}
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}
      {...textFieldProps}
      {...field}>
      {options.map((o) => {
        return (
          <MenuItem key={o.key} value={o.value}>
            {o.name}
          </MenuItem>
        )
      })}
    </TextField>
  )
}
