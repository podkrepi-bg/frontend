import React from 'react'
import { Trans, useTranslation } from 'next-i18next'
import { Typography, Grid2 } from '@mui/material'
import { useField } from 'formik'

import { CardRegion } from 'gql/donations.enums'
import { moneyPublicDecimals2 } from 'common/util/money'
import CheckboxField from 'components/common/form/CheckboxField'
import FormSelectField from 'components/common/form/FormSelectField'

export const TaxesCheckbox = () => {
  const { t } = useTranslation('donation-flow')
  const [amountWithFees] = useField('finalAmount')
  const [amountWithoutFees] = useField<number>('amountWithoutFees')
  return (
    <>
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 8 }}>
          <CheckboxField
            name="cardIncludeFees"
            label={
              <Typography variant="body2">
                {t('step.payment-method.field.include-fees.label')}
              </Typography>
            }
          />
        </Grid2>
        <Grid2 mb={2} size={{ xs: 12, sm: 4 }}>
          <FormSelectField
            name="cardRegion"
            label={t('step.payment-method.field.card-region.title')}
            options={[
              {
                key: CardRegion.EU,
                value: CardRegion.EU,
                name: t(`step.payment-method.field.card-region.${CardRegion.EU}`),
              },
              {
                key: CardRegion.UK,
                value: CardRegion.UK,
                name: t(`step.payment-method.field.card-region.${CardRegion.UK}`),
              },
              {
                key: CardRegion.Other,
                value: CardRegion.Other,
                name: t(`step.payment-method.field.card-region.${CardRegion.Other}`),
              },
            ]}
            InputProps={{ style: { fontSize: 14 } }}
          />
        </Grid2>
      </Grid2>
      <Trans
        t={t}
        i18nKey="step.payment-method.alert.calculated-fees"
        values={{
          amount: moneyPublicDecimals2(amountWithoutFees.value),
          fees: moneyPublicDecimals2(amountWithFees.value - amountWithoutFees.value),
          totalAmount: moneyPublicDecimals2(amountWithFees.value),
        }}
      />
    </>
  )
}
