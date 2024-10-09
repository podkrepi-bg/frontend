import React from 'react'
import { useField } from 'formik'
import {
  Card,
  CardProps,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
  Grid,
  Grid2,
  Skeleton,
} from '@mui/material'
import { styled, lighten } from '@mui/material/styles'
import theme from 'common/theme'

export const StyledRadioCardItem = styled(Card)(() => ({
  padding: theme.spacing(2),
  margin: 0,
  cursor: 'pointer',
  border: `1px solid ${theme.borders.dark}`,
  width: '100%',
  '&:focus-within': {
    outline: `2px solid ${theme.palette.common.black}`,
  },
}))

interface StyledRadioCardItemProps extends CardProps {
  control: React.ReactNode
  icon: React.ReactNode
  disabled?: boolean
  loading?: boolean
  selected?: boolean
  error?: boolean
}

function RadioCardItem({
  control,
  icon,
  selected,
  disabled,
  loading,
  error,
  ...rest
}: StyledRadioCardItemProps) {
  const selectedStyles = {
    backgroundColor: selected ? lighten(theme.palette.primary.light, 0.7) : 'inherit',
    borderColor: error ? theme.palette.error.main : 'inherit',
  }
  const disabledStyles = {
    opacity: 0.7,
    backgroundColor: `${theme.palette.grey[300]} !important`,
    pointerEvents: 'none',
    borderColor: `${theme.palette.grey[500]} !important`,
  }

  let styles = {}
  if (disabled) {
    styles = disabledStyles
  } else if (selected) {
    styles = selectedStyles
  }

  return loading ? (
    <Skeleton variant="rounded" width="100%" height={145} />
  ) : (
    <StyledRadioCardItem sx={styles} {...rest}>
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
  disabled?: boolean
}

export interface RadioCardGroupProps extends RadioGroupProps {
  options: Option[]
  name: string
  columns: 1 | 2 | 3 | 4 | 6 | 12
  loading?: boolean
  error?: boolean
}

/**
 * RadioCardGroup is a group of radio buttons that display a card for each option.
 * The <input> element is hidden, but accessible to screen readers.
 * @example
 * <RadioCardGroup
 *  name="donationAmount"
 *  options={[
 *  {
 *  value: '10',
 *  label: '$10',
 *  icon: <MoneyIcon />,
 * },
 * {
 * value: '25',
 * label: '$25',
 * icon: <MoneyIcon />,
 * },
 */
function RadioCardGroup({ options, name, columns, loading, error }: RadioCardGroupProps) {
  const [field, meta, { setValue }] = useField(name)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const showError =
    typeof error !== undefined ? Boolean(error) : Boolean(meta.error) && Boolean(meta.touched)

  return (
    <FormControl fullWidth required component="fieldset" error={showError}>
      <RadioGroup value={field.value} onChange={handleChange}>
        <Grid columnSpacing={3} container gap={3} mx={0}>
          {options.map((option) => (
            <Grid2 size={{ xs: 4 }} key={option.value}>
              <RadioCardItem
                onClick={() => setValue(option.value)}
                style={{
                  border: `1px solid ${
                    showError ? theme.palette.error.main : theme.palette.common.black
                  }`,
                }}
                control={
                  <FormControlLabel
                    value={option.value}
                    disableTypography
                    disabled={option.disabled}
                    sx={{
                      margin: 0,
                      ...theme.typography.h6,
                    }}
                    control={
                      <Radio
                        disabled={option.disabled}
                        sx={{
                          clipPath: 'polygon(0 0)',
                          position: 'absolute',
                        }}
                      />
                    }
                    label={option.label}
                  />
                }
                icon={option.icon}
                selected={field.value === option.value && !option.disabled}
                disabled={option.disabled}
                loading={loading}
              />
            </Grid2>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  )
}

export default RadioCardGroup
