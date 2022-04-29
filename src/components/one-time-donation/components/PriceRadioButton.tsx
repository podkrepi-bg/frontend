import { Check } from '@mui/icons-material'
import { FormControlLabel, Icon, Radio } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import theme from 'common/theme'
import React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    checked: {
      width: '309px',
      height: '75px',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginRight: '33px',
      marginBottom: '20px',
      background: '#D2F0FF',
    },
    unchecked: {
      width: '309px',
      height: '75px',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginRight: '33px',
      marginBottom: '20px',
    },
    iconUncheck: {
      fontSize: 39,
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '50px',
      marginRight: 5,
      marginLeft: '15px',
    },
    iconCheck: {
      backgroundColor: '#0098E3',
      borderRadius: '50px',
      color: '#294E85',
      marginRight: 5,
      marginLeft: '15px',
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
      className={checked ? classes.checked : classes.unchecked}
      label={<span style={{ fontSize: '20px' }}>{label}</span>}
      control={
        <Radio
          icon={<Icon className={classes.iconUncheck} />}
          checkedIcon={<Check color="primary" className={classes.iconCheck} />}
          checked={checked}
          onChange={onChange}
        />
      }
    />
  )
}

export default PriceRadioButton
