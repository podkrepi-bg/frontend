import { useTranslation } from 'react-i18next'
import { useField, useFormikContext } from 'formik'

import { MenuItem, TextField } from '@mui/material'

import { IrregularityStatus } from './irregularity.types'
import { TranslatableField, translateError } from 'common/form/validation'

export default function StatusSelect({ name = 'status' }) {
  const { t } = useTranslation('irregularity')
  const values = Object.values(IrregularityStatus)

  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldValue(name, event.target.value)
  }
  return (
    <TextField
      {...field}
      select
      variant="outlined"
      fullWidth
      onChange={handleChange}
      label={t('admin.fields.status')}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      {values.map((value, index) => (
        <MenuItem key={index} value={value}>
          {t('admin.fields.status-type.' + value.toLowerCase())}
        </MenuItem>
      ))}
    </TextField>
  )
}
