import { useTranslation } from 'react-i18next'
import { useField } from 'formik'

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

import { TranslatableField, translateError } from 'common/form/validation'
import { PersonRelation } from './BeneficiaryTypes'

export default function OrganizerRelationSelect({ name = 'status', label = '' }) {
  const { t } = useTranslation()
  const values = Object.values(PersonRelation)
  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>{t(label)}</InputLabel>
      <Select fullWidth defaultValue="" label={t(label)} {...field}>
        <MenuItem value="" disabled>
          {t(label)}
        </MenuItem>
        {values?.map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
