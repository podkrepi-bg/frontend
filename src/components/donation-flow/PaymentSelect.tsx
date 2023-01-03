import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import theme from 'common/theme'
import React from 'react'

function PaymentSelect() {
  const [value, setValue] = React.useState('female')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setValue(event.target.value)
  }
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="TODO: Label by the title"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{
          border: `1px solid ${theme.borders.dark}`,
          borderRadius: theme.borders.semiRound,
          padding: theme.spacing(2),
        }}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
  )
}

export default PaymentSelect
