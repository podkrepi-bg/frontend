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
}

const StyledRadioButton = styled('div')(() => ({
  [`& .${classes.radioWrapper}`]: {
    borderRadius: theme.borders.round,
    border: `1px solid ${theme.borders.dark}`,
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
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.borders.round,
  },

  [`& .${classes.label}`]: {
    fontSize: 14,
    marginLeft: theme.spacing(3),
  },

  [`& .${classes.disabled}`]: {
    color: theme.palette.text.disabled,
    background: theme.palette.background.default,
    border: `1px solid ${theme.palette.background.default}`,
  },
}))

//Write these styles with the new styled API

const StyledRadioWrapper = styled(FormControlLabel)(({ checked, disabled }) => ({
  borderRadius: theme.borders.round,
  padding: 0,
  width: '100%',
  margin: '0 auto',
  background: disabled
    ? theme.palette.grey[300]
    : checked
    ? lighten(theme.palette.primary.main, 0.8)
    : 'transparent',
  border: `1px solid ${
    checked ? theme.borders.light : disabled ? theme.palette.grey[500] : theme.borders.dark
  }`,
}))

const StyledCircle = styled('div')((props) => ({
  width: 30,
  height: 30,
  border: `1px solid ${
    props['aria-disabled'] ? theme.palette.grey[500] : theme.palette.primary.dark
  }`,
  borderRadius: theme.borders.round,
}))

const StyledLabel = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  marginLeft: theme.spacing(3),
}))

type RadioButtonProps = {
  checked: boolean
  label: string
  value: string | number
  disabled?: boolean
  muiRadioButtonProps?: Partial<RadioProps>
}

const selectedCheckStyles = {
  width: 30,
  height: 30,
  border: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.borders.round,
  color: theme.palette.common.white,
}
const disabledCheckStlyes = {
  width: 30,
  height: 30,
  border: `1px solid ${theme.palette.grey[500]}`,
  backgroundColor: theme.palette.grey[300],
  borderRadius: theme.borders.round,
  color: theme.palette.text.disabled,
}
function RadioButton({ checked, label, muiRadioButtonProps, value, disabled }: RadioButtonProps) {
  return (
    <StyledRadioButton>
      <StyledRadioWrapper
        value={value}
        disabled={disabled}
        checked={checked}
        label={<StyledLabel>{label}</StyledLabel>}
        control={
          <Radio
            icon={<StyledCircle aria-disabled={disabled} aria-checked={checked} />}
            checkedIcon={
              <Check
                color={disabled ? 'disabled' : 'primary'}
                sx={disabled ? disabledCheckStlyes : selectedCheckStyles}
              />
            }
            {...muiRadioButtonProps}
          />
        }
      />
    </StyledRadioButton>
  )
}

export default RadioButton
