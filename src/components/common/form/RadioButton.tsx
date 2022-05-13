import { Check } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { FormControlLabel, Radio, lighten, Typography, RadioProps } from '@mui/material'
import theme from 'common/theme'
import React from 'react'

const PREFIX = 'RadioButton'

const classes = {
  radioWrapper: `${PREFIX}-radioWrapper`,
  checked: `${PREFIX}-checked`,
  circle: `${PREFIX}-circle`,
  checkedCircle: `${PREFIX}-checkedCircle`,
  label: `${PREFIX}-label`,
}

const StyledCheck = styled(Check)(() => ({
  [`& .${classes.radioWrapper}`]: {
    borderRadius: theme.borders.round,
    border: `1px solid ${theme.borders.dark}`,
    padding: theme.spacing(2),
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
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.borders.round,
  },

  [`&.${classes.checkedCircle}`]: {
    width: 30,
    height: 30,
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.borders.round,
    color: theme.palette.common.white,
  },

  [`& .${classes.label}`]: {
    fontSize: 20,
    marginLeft: theme.spacing(3),
  },
}))

type RadioButtonProps = {
  checked: boolean
  label: string
  value: string | number
  muiRadioButtonProps?: Partial<RadioProps>
}

function RadioButton({ checked, label, muiRadioButtonProps, value }: RadioButtonProps) {
  return (
    <FormControlLabel
      value={value}
      className={`${classes.radioWrapper} ${checked ? classes.checked : null}`}
      label={<Typography className={classes.label}>{label}</Typography>}
      control={
        <Radio
          icon={<div className={classes.circle} />}
          checkedIcon={<StyledCheck color="primary" className={classes.checkedCircle} />}
          {...muiRadioButtonProps}
        />
      }
    />
  )
}

export default RadioButton
