import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useCountriesList } from 'common/hooks/countries'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'

export default function SelectCountry({ name = 'countryId' }) {
  const { t } = useTranslation()
  const { data } = useCountriesList()
  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>Държава</InputLabel>
      <Select fullWidth defaultValue="" label="Държава" {...field}>
        <MenuItem value="" disabled>
          Избери държава
        </MenuItem>
        {data?.map((country) => (
          <MenuItem key={country.id} value={country.id}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
