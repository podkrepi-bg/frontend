import React from 'react'
import { useField, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { MenuItem, TextField, TextFieldProps } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'
import { CityResponse } from 'gql/cities'

type Props = {
  label: string
  name: string
  cityList?: CityResponse[]
} & TextFieldProps

export default function CitySelect({ label, name, cityList, ...textFieldProps }: Props) {
  const { t } = useTranslation()

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
      size="small"
      fullWidth
      onChange={handleChange}
      label={t(label)}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      {cityList?.map((city) => {
        return (
          <MenuItem key={city.id} value={city.id}>
            {city.name}
          </MenuItem>
        )
      })}
    </TextField>
  )
}
