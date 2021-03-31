import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'

import { TranslatableField, translateError } from 'common/form/validation'
import { MouseEventHandler } from 'react'

export type CheckboxFieldProps = {
  name: string
  label: string
  preChecked?: boolean
  handleClick?: MouseEventHandler
}

export default function CheckboxField({ name, label, preChecked }: CheckboxFieldProps) {
  const { t } = useTranslation()
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  field.value = preChecked ? true : Boolean(field.value)
  preChecked = false
  return (
    <FormControl required component="fieldset" error={Boolean(meta.error) && Boolean(meta.touched)}>
      <FormControlLabel
        label={typeof label === 'string' ? t(label) : label}
        control={<Checkbox color="primary" checked={Boolean(field.value)} {...field} />}
      />
      {Boolean(meta.error) && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
