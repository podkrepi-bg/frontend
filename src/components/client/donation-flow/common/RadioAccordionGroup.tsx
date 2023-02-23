import React from 'react'
import {
  Box,
  BoxProps,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  TextField,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import theme from 'common/theme'
import CardIcon from '../icons/CardIcon'
import BankIcon from '../icons/BankIcon'

export const StyledRadioAccordionItem = styled(Box)(() => ({
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.borders.dark}`,
  },
  padding: theme.spacing(2),
  margin: 0,
  cursor: 'pointer',
}))

interface RadioAccordionItemProps extends BoxProps {
  control: React.ReactNode
  icon: React.ReactNode
  content?: React.ReactNode
  selected?: boolean
}

// Temporarily here for testing until the components starts being used
export const testRadioOptions: Option[] = [
  {
    value: 'card',
    label: 'Card',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField sx={{ mb: 3 }} placeholder="Card info" />
        <Button variant="contained">Content</Button>
      </div>
    ),
    icon: <CardIcon sx={{ width: 50, height: 50 }} />,
  },
  {
    value: 'bank',
    label: 'Bank',
    content: <div>TODO: Add bank form</div>,
    icon: <BankIcon sx={{ width: 45, height: 45 }} />,
  },
]

function RadioAccordionItem({
  control,
  icon,
  selected,
  content,
  ...rest
}: RadioAccordionItemProps) {
  return (
    <StyledRadioAccordionItem {...rest}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {control}
        {icon}
      </Box>
      <Collapse unmountOnExit in={selected}>
        {content}
      </Collapse>
    </StyledRadioAccordionItem>
  )
}

type Option = {
  value: string
  label: string
  content: React.ReactNode
  icon: React.ReactNode
}

export interface RadioAccordionGroupProps extends RadioGroupProps {
  options: Option[]
  defaultValue?: string
}

function RadioAccordionGroup({ options, defaultValue }: RadioAccordionGroupProps) {
  const [value, setValue] = React.useState(defaultValue)

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
          <RadioAccordionItem
            key={option.value}
            onClick={() => setValue(option.value)}
            control={
              <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
            }
            icon={option.icon}
            selected={value === option.value}
            content={option.content}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default RadioAccordionGroup
