import React from 'react'
import { Box, BoxProps, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { styled } from '@mui/material/styles'
import theme from 'common/theme'

export const StyledSelectItem = styled(Box)(() => ({
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.borders.dark}`,
  },
  padding: theme.spacing(2),
  margin: 0,
  display: 'flex',
  justifyContent: 'space-between',
}))
interface PaymentSelectItemProps extends BoxProps {
  control: React.ReactNode
  icon: React.ReactNode
}

function PaymentSelectItem({ control, icon, ...rest }: PaymentSelectItemProps) {
  return (
    <StyledSelectItem {...rest}>
      {control}
      {icon}
    </StyledSelectItem>
  )
}

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

function PaymentSelect() {
  const [value, setValue] = React.useState('female')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        {options.map((option) => (
          <PaymentSelectItem
            key={option.value}
            onClick={() => setValue(option.value)}
            control={
              <FormControlLabel
                value={option.value}
                control={<Radio />}
                label={option.label}
                sx={{ margin: 0 }}
              />
            }
            icon={<div>Icon</div>}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default PaymentSelect
