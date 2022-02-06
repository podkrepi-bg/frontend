import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'

import { TranslatableField, translateError } from 'common/form/validation'
import { useCitiesList } from 'common/hooks/cities'

export default function CompaniesCitySelect({ name = 'cityId' }) {
  const { t } = useTranslation()
  const { data } = useCitiesList()
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>{t('cities:select')}</InputLabel>
      <Select label="select city" {...field}>
        <MenuItem value="" disabled>
          {t('cities:index')}
        </MenuItem>
        {data?.map((x) => (
          <MenuItem key={x.id} value={x.id}>
            {x.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
