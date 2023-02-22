import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useCountriesList } from 'common/hooks/countries'
import { useField } from 'formik'
import { CountryResponse } from 'gql/countries'
import { useTranslation } from 'next-i18next'

type Props = {
  formField?: string
  valueName?: keyof CountryResponse
}

export default function CountrySelect({
  formField = 'countryCode',
  valueName = 'countryCode',
}: Props) {
  const { t } = useTranslation()
  const { data } = useCountriesList()
  const [field, meta] = useField(formField)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  if (!data) {
    return null
  }

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>{t('countries:country')}</InputLabel>
      <Select fullWidth defaultValue="" label={t('countries:country')} {...field}>
        <MenuItem value="" disabled>
          {t('countries:select-country')}
        </MenuItem>
        {data?.map((country) => (
          <MenuItem key={country.id} value={country[valueName] as string}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
