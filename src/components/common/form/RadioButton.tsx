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
}))

type RadioButtonProps = {
  checked: boolean
  label: string
  value: string | number
  muiRadioButtonProps?: Partial<RadioProps>
}

function RadioButton({ checked, label, muiRadioButtonProps, value }: RadioButtonProps) {
  return (
    <StyledRadioButton>
      <FormControlLabel
        value={value}
        className={`${classes.radioWrapper} ${checked ? classes.checked : null}`}
        sx={checked ? {} : undefined}
        label={<Typography className={classes.label}>{label}</Typography>}
        control={
          <Radio
            icon={<div className={classes.circle} />}
            checkedIcon={
              <Check
                color="primary"
                sx={
                  checked
                    ? {
                        width: 30,
                        height: 30,
                        border: `1px solid ${theme.palette.primary.main}`,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: theme.borders.round,
                        color: theme.palette.common.white,
                      }
                    : undefined
                }
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
