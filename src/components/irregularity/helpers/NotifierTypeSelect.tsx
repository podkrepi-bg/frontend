import { useTranslation } from 'react-i18next'
import { MenuItem, TextField } from '@mui/material'
import { useField, useFormikContext } from 'formik'

import { NotifierTypes } from './irregularity.types'
import { TranslatableField, translateError } from 'common/form/validation'

export default function NotifierTypeSelect({ name = 'notifierType' }) {
  const { t } = useTranslation('irregularity')
  const values = Object.values(NotifierTypes)

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
      label={t('admin.fields.type')}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      {values.map((value, index) => (
        <MenuItem key={index} value={value}>
          {t('admin.fields.notifier-type.' + value)}
        </MenuItem>
      ))}
    </TextField>
  )
}
