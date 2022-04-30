import { Check } from '@mui/icons-material'
import { FormControlLabel, Radio, lighten } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import theme from 'common/theme'
import React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    radioWrapper: {
      borderRadius: theme.borders.roundRadius,
      border: `1px solid ${theme.borders.dark}`,
      padding: theme.spacing(2),
      minWidth: 310,
    },
    checked: {
      background: lighten(theme.palette.primary.main, 0.8),
      border: `1px solid ${theme.borders.light}`,
    },
    circle: {
      width: 30,
      height: 30,
      border: `1px solid ${theme.palette.primary.dark}`,
      borderRadius: theme.borders.roundRadius,
    },
    checkedCircle: {
      width: 30,
      height: 30,
      border: `1px solid ${theme.palette.primary.dark}`,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.borders.roundRadius,
      color: theme.palette.primary.dark,
    },
  }),
)

type PriceRadioButtonProps = {
  checked: boolean
  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

function PriceRadioButton({ checked, onChange, label }: PriceRadioButtonProps) {
  const classes = useStyles()
  return (
    <FormControlLabel
      className={`${classes.radioWrapper} ${checked ? classes.checked : null}`}
      label={<span style={{ fontSize: '20px' }}>{label}</span>}
      control={
        <Radio
          icon={<div className={classes.circle} />}
          checkedIcon={<Check color="primary" className={classes.checkedCircle} />}
          checked={checked}
          onChange={onChange}
        />
      }
    />
  )
}

export default PriceRadioButton
