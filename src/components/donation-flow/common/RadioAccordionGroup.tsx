import React from 'react'
import {
  Box,
  BoxProps,
  Collapse,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useField } from 'formik'
import theme from 'common/theme'

export const BaseRadioAccordionItem = styled(Box)(() => ({
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.borders.dark}`,
    borderTopLeftRadius: theme.borders.semiRound,
    borderTopRightRadius: theme.borders.semiRound,
  },
  '&:last-child': {
    borderBottomLeftRadius: theme.borders.semiRound,
    borderBottomRightRadius: theme.borders.semiRound,
  },
  padding: theme.spacing(2),
  margin: 0,
  cursor: 'pointer',
}))

export const DisabledRadioAccordionItem = styled(BaseRadioAccordionItem)(() => ({
  opacity: 0.7,
  backgroundColor: `${theme.palette.grey[300]} !important`,
  pointerEvents: 'none',
}))

interface RadioAccordionItemProps extends BoxProps {
  control: React.ReactNode
  icon: React.ReactNode
  content?: React.ReactNode
  selected?: boolean
  disabled?: boolean
}

function RadioAccordionItem({
  control,
  icon,
  selected,
  content,
  disabled,
  ...rest
}: RadioAccordionItemProps) {
  let StyledRadioAccordionItem = BaseRadioAccordionItem
  if (disabled) {
    StyledRadioAccordionItem = DisabledRadioAccordionItem
  }
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
  disabled?: boolean
}

export interface RadioAccordionGroupProps extends RadioGroupProps {
  options: Option[]
  name: string
}

function RadioAccordionGroup({ options, name, ...rest }: RadioAccordionGroupProps) {
  const [field, meta, { setValue }] = useField(name)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <FormControl
      fullWidth
      required
      component="fieldset"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <RadioGroup
        value={field.value}
        onChange={handleChange}
        sx={{
          border: `1px solid ${theme.borders.dark}`,
          borderRadius: theme.borders.semiRound,
        }}
        {...rest}>
        {options.map((option) => (
          <RadioAccordionItem
            key={option.value}
            onClick={() => setValue(option.value)}
            control={
              <FormControlLabel
                value={option.value}
                control={<Radio />}
                label={option.label}
                disabled={option.disabled}
              />
            }
            icon={option.icon}
            selected={field.value === option.value}
            content={option.content}
            disabled={option.disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default RadioAccordionGroup
