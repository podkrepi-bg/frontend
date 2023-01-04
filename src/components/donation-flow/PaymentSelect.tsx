import React from 'react'
import {
  Box,
  BoxProps,
  Collapse,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import theme from 'common/theme'
import CardIcon from './CardIcon'

export const StyledSelectItem = styled(Box)(() => ({
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.borders.dark}`,
  },
  padding: theme.spacing(2),
  margin: 0,
  cursor: 'pointer',
}))

interface PaymentSelectItemProps extends BoxProps {
  control: React.ReactNode
  icon: React.ReactNode
  content?: React.ReactNode
  selected?: boolean
}

function PaymentSelectItem({ control, icon, selected, content, ...rest }: PaymentSelectItemProps) {
  return (
    <StyledSelectItem {...rest}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {control}
        {icon}
      </Box>
      <Collapse in={selected}>{content}</Collapse>
    </StyledSelectItem>
  )
}

const options = [
  { value: 'card', label: 'Card', content: <div>TODO: Add card form</div> },
  { value: 'bank', label: 'Bank', content: <div>TODO: Add bank form</div> },
]

function PaymentSelect() {
  const [value, setValue] = React.useState('card')

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
          <>
            <PaymentSelectItem
              key={option.value}
              onClick={() => setValue(option.value)}
              control={
                <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
              }
              icon={<CardIcon sx={{ width: 50, height: 50 }} />}
              selected={value === option.value}
              content={option.content}
            />
          </>
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default PaymentSelect
