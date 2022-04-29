import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { FormControl, FormHelperText, RadioGroup, Typography } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import PriceRadioButton from './PriceRadioButton'
import Stripe from 'stripe'
import { money } from 'common/util/money'

export type CheckboxFieldProps = {
  name: string
  options: Stripe.Price[] | undefined
}

export default function PriceRadioGroup({ name, options }: CheckboxFieldProps) {
  const { t } = useTranslation('one-time-donation')
  const [field, meta, helpers] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  const { value: fieldValue } = meta
  const { setValue } = helpers
  return (
    <FormControl required component="fieldset" error={Boolean(meta.error) && Boolean(meta.touched)}>
      <RadioGroup value={fieldValue} row={field.name === 'amount'} name={name}>
        {options ? (
          options.map(({ unit_amount: optionValue }, index) => (
            <PriceRadioButton
              onChange={() => {
                setValue(optionValue)
              }}
              checked={optionValue === fieldValue}
              label={money(optionValue || 0)}
              key={index}
            />
          ))
        ) : (
          <Typography>There are no avaliable donations you can make :(</Typography>
        )}
      </RadioGroup>
      {Boolean(meta.error) && <FormHelperText error>{t(helperText!)}</FormHelperText>}
    </FormControl>
  )
}
