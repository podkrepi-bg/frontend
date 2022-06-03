import { useTranslation } from 'react-i18next'
import { useField, useFormikContext } from 'formik'

import { MenuItem, TextField } from '@mui/material'

import { TranslatableField, translateError } from 'common/form/validation'

import { IrregularityReason } from './irregularity.types'

export default function IrregularityReasonSelect({ name = 'info.reason' }) {
  const { t } = useTranslation('irregularity')
  const values = Object.values(IrregularityReason)

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
      label={t('reason.label')}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      {values.map((value, index) => (
        <MenuItem key={index} value={value}>
          {t(`reason.${value}`)}
        </MenuItem>
      ))}
    </TextField>
  )
}
