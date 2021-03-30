import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'

import { TranslatableField, translateError } from 'common/form/validation'
import { MouseEventHandler } from 'react'

export type CheckboxFieldProps = {
  name: string
  label: string
  onClick?: MouseEventHandler
  preChecked?: boolean
}

export default function CheckboxField({ name, label, preChecked, onClick }: CheckboxFieldProps) {
  const { t } = useTranslation()
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  const checked =
    preChecked === undefined ? Boolean(field.value) : Boolean(field.value && preChecked)
  return (
    <FormControl required component="fieldset" error={Boolean(meta.error) && Boolean(meta.touched)}>
      <FormControlLabel
        label={typeof label === 'string' ? t(label) : label}
        control={<Checkbox color="primary" onClick={onClick} checked={checked} {...field} />}
      />
      {Boolean(meta.error) && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
