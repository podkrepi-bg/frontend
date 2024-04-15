import { ChangeEvent } from 'react'

import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Tooltip,
  SxProps,
  Theme,
  CheckboxProps,
} from '@mui/material'

import { TranslatableField, translateError } from 'common/form/validation'

export type CheckboxFieldProps = {
  name: string
  sx?: SxProps<Theme>
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  label: string | number | React.ReactElement
  disabledTooltip?: string
  checkboxProps?: CheckboxProps
  showFieldError?: boolean
}

export default function CheckboxField({
  sx,
  name,
  disabled,
  onChange: handleChange,
  label,
  disabledTooltip,
  checkboxProps,
  showFieldError,
}: CheckboxFieldProps) {
  const { t } = useTranslation()
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  const showError =
    typeof showFieldError !== undefined
      ? showFieldError
      : Boolean(meta.error) && Boolean(meta.touched)
  return (
    <FormControl required component="fieldset" error={showError}>
      <Tooltip title={disabled && disabledTooltip} arrow>
        <FormControlLabel
          label={typeof label === 'string' ? `${t(label)}` : label}
          control={
            <Checkbox
              sx={sx}
              color="primary"
              checked={Boolean(field.value)}
              disabled={disabled}
              {...field}
              {...checkboxProps}
              onChange={(e) => {
                field.onChange(e)
                if (handleChange) handleChange(e)
              }}
            />
          }
        />
      </Tooltip>
      {showFieldError === undefined && Boolean(meta.error) && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
