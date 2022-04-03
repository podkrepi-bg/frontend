import { useTranslation } from 'react-i18next'
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { useField } from 'formik'

export default function DeletedCheckbox() {
  const name = 'deleted'
  const { t } = useTranslation('expenses')
  const [field, meta] = useField(name)

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <FormControlLabel
        disabled
        control={<Checkbox {...field} />}
        label={`${t('fields.' + name)}`}
      />
    </FormControl>
  )
}
