import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'
import { useCompaniesList } from 'service/company'

export default function CompanySelect({ name = 'companyId', label = '' }) {
  const { t } = useTranslation()
  const { data } = useCompaniesList()
  const [field, meta] = useField(name)

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
      <InputLabel>{label}</InputLabel>
      <Select fullWidth defaultValue="" label={label} {...field}>
        <MenuItem value="" disabled>
          {label}
        </MenuItem>
        <MenuItem key={'none'} value="">
          <i>---</i>
        </MenuItem>
        {data?.map((company, index) => (
          <MenuItem key={index} value={company.id}>
            {company.companyName}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
