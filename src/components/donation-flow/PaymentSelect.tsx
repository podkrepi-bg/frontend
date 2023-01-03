import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { styled } from '@mui/material/styles'
import theme from 'common/theme'
import React from 'react'

export const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.borders.dark}`,
  },
  padding: theme.spacing(2),
  margin: 0,
}))

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
        }}>
        <StyledFormControlLabel
          sx={{ borderBottom: `1px solid ${theme.borders.dark}`, padding: theme.spacing(2) }}
          value="female"
          control={<Radio />}
          label="Female"
        />
        <StyledFormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
  )
}

export default PaymentSelect
