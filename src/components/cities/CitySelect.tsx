import React from 'react'
import { useField, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { MenuItem, TextField, TextFieldProps } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'
import { useCitiesList } from 'common/hooks/cities'

type Props = {
  name: string
} & TextFieldProps

export default function CitySelect({ name, ...textFieldProps }: Props) {
  const { t } = useTranslation()
  const { data: cityList } = useCitiesList()

  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldValue(name, event.target.value)
  }

  if (!cityList) {
    return null
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
      label={t('cities:city-label')}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      <MenuItem value="" disabled>
        {t('cities:select-city')}
      </MenuItem>
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
