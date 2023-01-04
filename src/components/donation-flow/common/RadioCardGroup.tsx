import React from 'react'
import {
  Card,
  CardProps,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
  Unstable_Grid2 as Grid2,
} from '@mui/material'
import { styled, lighten } from '@mui/material/styles'
import theme from 'common/theme'
import CardIcon from '../icons/CardIcon'
import BankIcon from '../icons/BankIcon'

export const StyledRadioCardItem = styled(Card)(() => ({
  padding: theme.spacing(2),
  margin: 0,
  cursor: 'pointer',
  border: `1px solid ${theme.borders.dark}`,
}))

interface StyledRadioCardItemProps extends CardProps {
  control: React.ReactNode
  icon: React.ReactNode
  selected?: boolean
}

// Temporarily here for testing until the components starts being used
export const testRadioOptions: Option[] = [
  {
    value: 'card',
    label: 'Card',
    icon: <CardIcon sx={{ width: 80, height: 80 }} />,
  },
  {
    value: 'bank',
    label: 'Bank',
    icon: <BankIcon sx={{ width: 80, height: 80 }} />,
  },
  {
    value: 'paypal',
    label: 'PayPal',
    icon: <BankIcon sx={{ width: 80, height: 80 }} />,
  },
]

function RadioCardItem({ control, icon, selected, ...rest }: StyledRadioCardItemProps) {
  return (
    <StyledRadioCardItem
      sx={{ backgroundColor: selected ? lighten(theme.palette.primary.light, 0.7) : 'inherit' }}
      {...rest}>
      <Stack justifyContent="center" alignItems="center">
        {icon}
        {control}
      </Stack>
    </StyledRadioCardItem>
  )
}

type Option = {
  value: string
  label: string
  icon: React.ReactNode
}

export interface RadioCardGroupProps extends RadioGroupProps {
  options: Option[]
  defaultValue?: string
}

function RadioCardGroup({ options, defaultValue }: RadioCardGroupProps) {
  const [value, setValue] = React.useState(defaultValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  console.log(theme.typography.h1)
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="TODO: Label by the title"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}>
        <Grid2 spacing={2} container>
          {options.map((option) => (
            <Grid2 xs={4} key={option.value}>
              <RadioCardItem
                onClick={() => setValue(option.value)}
                control={
                  <FormControlLabel
                    value={option.value}
                    disableTypography
                    sx={{ margin: 0, ...theme.typography.h6 }}
                    control={
                      <Radio
                        sx={{ opacity: 0, position: 'absolute', width: 0, height: 0 }}
                        inputProps={{
                          style: {
                            width: 0,
                            height: 0,
                          },
                        }}
                      />
                    }
                    label={option.label}
                  />
                }
                icon={option.icon}
                selected={value === option.value}
              />
            </Grid2>
          ))}
        </Grid2>
      </RadioGroup>
    </FormControl>
  )
}

export default RadioCardGroup
