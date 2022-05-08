import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  Icon,
  lighten,
  Typography,
} from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import React from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import CheckIcon from '@mui/icons-material/Check'
import theme from 'common/theme'

const useStyles = makeStyles(() =>
  createStyles({
    checked: {
      background: lighten(theme.palette.primary.main, 0.8),
      border: `1px solid ${theme.borders.light}`,
    },
    circle: {
      width: 30,
      height: 30,
      border: `1px solid ${theme.palette.primary.dark}`,
      borderRadius: theme.borders.round,
    },
    checkedCircle: {
      width: 30,
      height: 30,
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.borders.round,
      color: '#fff',
    },
    label: {
      fontWeight: 'bold',
      marginLeft: theme.spacing(1),
    },
  }),
)
export type CircleCheckboxField = {
  name: string
  label: string | number | React.ReactElement
  labelProps?: Partial<FormControlLabelProps>
}

export default function CircleCheckboxField({ name, label, labelProps }: CircleCheckboxField) {
  const classes = useStyles()
  const { t } = useTranslation('one-time-donation')
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl required component="fieldset" error={Boolean(meta.error) && Boolean(meta.touched)}>
      <FormControlLabel
        className={field.checked ? classes.checked : undefined}
        label={<Typography className={classes.label}>{label}</Typography>}
        control={
          <Checkbox
            icon={<Icon className={classes.circle} />}
            checkedIcon={<CheckIcon className={classes.checkedCircle} />}
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
