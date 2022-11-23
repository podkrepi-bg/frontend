import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  Icon,
  Typography,
} from '@mui/material'
import { lighten } from '@mui/material/styles'
import { TranslatableField, translateError } from 'common/form/validation'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import theme from 'common/theme'

export type CircleCheckboxField = {
  name: string
  label: string | number | React.ReactElement
  labelProps?: Partial<FormControlLabelProps>
}

export default function CircleCheckboxField({ name, label, labelProps }: CircleCheckboxField) {
  const { t } = useTranslation('one-time-donation')
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl required component="fieldset" error={Boolean(meta.error) && Boolean(meta.touched)}>
      <FormControlLabel
        sx={
          field.checked
            ? {
                background: lighten(theme.palette.primary.main, 0.8),
                border: `1px solid ${theme.borders.light}`,
              }
            : undefined
        }
        label={<Typography sx={{ fontWeight: 'bold', ml: 1 }}>{label}</Typography>}
        control={
          <Checkbox
            icon={
              <Icon
                sx={(theme) => ({
                  width: 30,
                  height: 30,
                  border: `1px solid ${theme.palette.primary.dark}`,
                  // @ts-expect-error theme doesn't include overrides
                  borderRadius: theme.borders.round,
                })}
              />
            }
            checkedIcon={
              <CheckIcon
                sx={(theme) => ({
                  width: 30,
                  height: 30,
                  border: `1px solid ${theme.palette.primary.main}`,
                  backgroundColor: theme.palette.primary.main,
                  // @ts-expect-error theme doesn't include overrides
                  borderRadius: theme.borders.round,
                  color: '#fff',
                })}
              />
            }
            checked={Boolean(field.value)}
            {...field}
          />
        }
        {...labelProps}
      />
      {Boolean(meta.error) && (
        <FormHelperText error>{helperText ? t(helperText) : 'General Error'}</FormHelperText>
      )}
    </FormControl>
  )
}
