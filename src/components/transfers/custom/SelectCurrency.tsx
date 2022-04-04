import React from 'react'
import { useTranslation } from 'next-i18next'
import { useField, useFormikContext } from 'formik'

import { MenuItem, TextField, TextFieldProps } from '@mui/material'

import { Currency } from 'gql/currency'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

type selectProps = {
  label: string
  name: string
} & TextFieldProps

export default function SelectCurrency({ label, name, ...textFieldProps }: selectProps) {
  const { t } = useTranslation('transfer')

  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldValue(name, event.target.value)
  }
  return (
    <TextField
      {...textFieldProps}
      {...field}
      select
      variant="outlined"
      fullWidth
      onChange={handleChange}
      label={t(label)}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      {Object.values(Currency).map((currency) => {
        return (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        )
      })}
    </TextField>
  )
}
