import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import {
  FormControl,
  FormHelperText,
  Grid,
  GridProps,
  RadioGroup,
  RadioGroupProps,
  Typography,
} from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import PriceRadioButton from './RadioButton'

export type RadioButtonGroupOptions = {
  label: string
  value: string | number
  hidden?: boolean
}

export type RadioButtonGroup = {
  name: string
  options: RadioButtonGroupOptions[]
  disabled?: boolean
  loading?: boolean
  columns?: number
  muiRadioGroupProps?: Partial<RadioGroupProps>
  /**
   * Props that get passed to the `<Grid>` that wraps around each rendered button
   * @example
   * <Grid {...propsYouPassed}>
   *  <RadioButton>
   * <Grid />
   */
  muiRadioButtonGridProps?: Partial<GridProps>
  ref?: React.RefObject<HTMLDivElement>
  error?: boolean
}

export default function RadioButtonGroup({
  name,
  options,
  disabled,
  loading,
  columns = 2,
  muiRadioGroupProps,
  muiRadioButtonGridProps,
  error,
}: RadioButtonGroup) {
  const { t } = useTranslation()
  const [field, meta, { setValue }] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  const showError =
    typeof error !== undefined ? Boolean(error) : Boolean(meta.error) && Boolean(meta.touched)
  return (
    <FormControl fullWidth disabled={disabled} required component="fieldset" error={showError}>
      <RadioGroup
        onChange={(e, v) => {
          setValue(v)
        }}
        value={field.value}
        name={name}
        {...muiRadioGroupProps}>
        <Grid rowSpacing={2} columnSpacing={2} container>
          {options ? (
            <>
              {options.flatMap(
                ({ label: optionLabel, value: optionValue, hidden }, index) =>
                  !hidden && (
                    <Grid key={index} item xs={12} sm={12 / columns} {...muiRadioButtonGridProps}>
                      <PriceRadioButton
                        disabled={disabled}
                        loading={loading}
                        error={showError}
                        value={optionValue}
                        checked={optionValue == field.value}
                        label={optionLabel}
                      />
                    </Grid>
                  ),
              )}
            </>
          ) : (
            <Typography>There are no avaliable choices you can make :(</Typography>
          )}
        </Grid>
      </RadioGroup>
      {typeof error === undefined && showError && helperText && (
        <FormHelperText error>{t(helperText)}</FormHelperText>
      )}
    </FormControl>
  )
}
