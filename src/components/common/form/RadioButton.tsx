import { Check } from '@mui/icons-material'
import { styled, lighten } from '@mui/material/styles'
import { FormControlLabel, Radio, Typography, RadioProps } from '@mui/material'
import theme from 'common/theme'
import React from 'react'

const PREFIX = 'RadioButton'

const classes = {
  radioWrapper: `${PREFIX}-radioWrapper`,
  checked: `${PREFIX}-checked`,
  circle: `${PREFIX}-circle`,
  checkedCircle: `${PREFIX}-checkedCircle`,
  label: `${PREFIX}-label`,
  disabled: `${PREFIX}-disabled`,
  error: `${PREFIX}-error`,
  checkIcon: `${PREFIX}-checkIcon`,
}

type StyledRadioWrapperProps = {
  error?: boolean
}

const StyledRadioButton = styled('div')<StyledRadioWrapperProps>(({ error }) => ({
  [`& .${classes.radioWrapper}`]: {
    borderRadius: theme.borders.round,
    border: `1px solid ${error ? theme.palette.error.main : theme.borders.dark}`,
    padding: 0,
    width: '100%',
    margin: '0 auto',
  },

  [`& .${classes.checked}`]: {
    background: lighten(theme.palette.primary.main, 0.8),
    border: `1px solid ${theme.borders.light}`,
  },

  [`& .${classes.circle}`]: {
    width: 30,
    height: 30,
    border: `1px solid ${error ? theme.palette.error.main : theme.palette.primary.dark}`,
    borderRadius: theme.borders.round,
  },

  [`& .${classes.checkIcon}`]: {
    width: 30,
    height: 30,
    border: `1px solid ${error ? theme.palette.error.main : theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.borders.round,
    color: theme.palette.common.white,
  },

  [`& .${classes.label}`]: {
    fontSize: 14,

    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
}))

type RadioButtonProps = {
  checked: boolean
  label: string
  value: string | number
  disabled?: boolean
  loading?: boolean
  muiRadioButtonProps?: Partial<RadioProps>
  error?: boolean
}

function RadioButton({ checked, label, muiRadioButtonProps, value, error }: RadioButtonProps) {
  return (
    <StyledRadioButton error={error}>
      <FormControlLabel
        value={value}
        className={`${classes.radioWrapper} ${checked ? classes.checked : null}`}
        sx={checked ? {} : undefined}
        label={
          <Typography className={classes.label} sx={{ wordBreak: 'break-word' }}>
            {label}
          </Typography>
        }
        control={
          <Radio
            icon={<div className={`${classes.circle}`} />}
            checkedIcon={
              <Check color="primary" className={checked ? classes.checkIcon : undefined} />
            }
            {...muiRadioButtonProps}
          />
        }
      />
    </StyledRadioButton>
  )
}

export default RadioButton
