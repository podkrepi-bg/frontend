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
}

export default function RadioButtonGroup({
  name,
  options,
  columns = 2,
  muiRadioGroupProps,
  muiRadioButtonGridProps,
}: RadioButtonGroup) {
  const { t } = useTranslation('one-time-donation')
  const [field, meta, { setValue }] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl
      fullWidth
      required
      component="fieldset"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
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
      {Boolean(meta.error) && Boolean(meta.touched) && helperText && (
        <FormHelperText error>{t(helperText)}</FormHelperText>
      )}
    </FormControl>
  )
}
