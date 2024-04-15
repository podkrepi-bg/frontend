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
  '&:first-of-type': {
    borderBottom: `1px solid ${theme.borders.dark}`,
    borderTopLeftRadius: theme.borders.semiRound,
    borderTopRightRadius: theme.borders.semiRound,
  },
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.borders.dark}`,
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
  borderColor: `${theme.palette.grey[500]} !important`,
}))

interface RadioAccordionItemProps extends Omit<BoxProps, 'content'> {
  control: React.ReactNode
  icon?: React.ReactNode
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
  icon?: React.ReactNode
  disabled?: boolean
  control?: React.ReactElement
}

export interface RadioAccordionGroupProps extends RadioGroupProps {
  /**
   * The options to display in the radio group.
   */
  options: Option[]

  /**
   * The name of the field.
   * This is used to link the radio group to the form.
   */
  name: string
  /**
   * Whether the field has an error
   */
  error?: boolean
}

/**
 * A radio group that displays a list of options. Each option can be expanded to show more content.
 * @example
 * <RadioAccordionGroup
 *  name="authentication"
 * options={[
 *  {
 *   value: 'login',
 *  label: 'Login',
 * disabled: Boolean(session?.user),
 * content: <LoginForm />,
 * },
 * {
 * value: 'register',
 * label: 'Register',
 * disabled: Boolean(session?.user),
 * content: <RegisterForm />,
 * }]

 */
function RadioAccordionGroup({ options, name, sx, error, ...rest }: RadioAccordionGroupProps) {
  const [field, meta, { setValue }] = useField(name)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const showError =
    typeof error !== undefined ? error : Boolean(meta.error) && Boolean(meta.touched)

  return (
    <FormControl fullWidth required component="fieldset" error={showError}>
      <RadioGroup
        value={field.value}
        onChange={handleChange}
        sx={{
          border: `1px solid ${showError ? theme.palette.error.main : theme.borders.dark}`,
          borderRadius: theme.borders.semiRound,
          ...sx,
        }}
        {...rest}>
        {options.map((option) => (
          <RadioAccordionItem
            key={option.value}
            onClick={() => setValue(option.value)}
            control={
              <FormControlLabel
                value={option.value}
                control={option.control || <Radio />}
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
