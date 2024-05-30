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
} from '@mui/material'

import { TranslatableField, translateError } from 'common/form/validation'

export type CheckboxFieldProps = {
  name: string
  sx?: SxProps<Theme>
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  label: string | number | React.ReactElement
  disabledTooltip?: string
}

export default function CheckboxField({
  sx,
  name,
  disabled,
  onChange: handleChange,
  label,
  disabledTooltip,
}: CheckboxFieldProps) {
  const { t } = useTranslation()
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl required component="fieldset" error={Boolean(meta.error) && Boolean(meta.touched)}>
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
              onChange={(e) => {
                field.onChange(e)
                if (handleChange) handleChange(e)
              }}
            />
          }
        />
      </Tooltip>
      {Boolean(meta.error) && (
        <FormHelperText sx={{ marginTop: 0 }} error>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
