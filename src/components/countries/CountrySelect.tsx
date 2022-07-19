import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useCountriesList } from 'common/hooks/countries'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'

export default function CountrySelect({ name = 'countryCode', disabled = false }) {
  const { t } = useTranslation()
  const { data } = useCountriesList()
  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  if (!data) {
    return null
  }

  return (
    <FormControl
      fullWidth
      disabled={disabled}
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>{t('countries:country-label')}</InputLabel>
      <Select fullWidth defaultValue="" label={t('countries:country-label')} {...field}>
        <MenuItem value="" disabled>
          {t('countries:select-country')}
        </MenuItem>
        {data?.map((country) => (
          <MenuItem key={country.id} value={country.countryCode}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
