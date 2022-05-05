import { useTranslation } from 'react-i18next'
import { useField, useFormikContext } from 'formik'

import { MenuItem, TextField } from '@mui/material'

import { TranslatableField, translateError } from 'common/form/validation'

import { ReportReason } from './report.types'

export default function ReportReasonSelect({ name = 'info.reason' }) {
  const { t } = useTranslation('irregularity-report')
  const values = Object.values(ReportReason)

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
      // label=""
      label={t('reason.label')}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      {values.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value === ReportReason.NONE ? '' : t(`reason.${value}`)}
        </MenuItem>
      ))}
    </TextField>
  )
}
