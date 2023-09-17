import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'

import { TranslatableField, translateError } from 'common/form/validation'

export type CheckboxFieldProps = {
  name: string
  disabled?: boolean
  label: string | number | React.ReactElement
}

export default function CheckboxField({ name, disabled, label }: CheckboxFieldProps) {
  const { t } = useTranslation()
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl required component="fieldset" error={Boolean(meta.error) && Boolean(meta.touched)}>
      <FormControlLabel
        label={typeof label === 'string' ? `${t(label)}` : label}
        control={
          <Checkbox color="primary" checked={Boolean(field.value)} disabled={disabled} {...field} />
        }
      />
      {Boolean(meta.error) && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
