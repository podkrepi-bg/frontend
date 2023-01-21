import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Typography, Unstable_Grid2 as Grid2 } from '@mui/material'
import { useField } from 'formik'

import { CardRegion } from 'gql/donations.enums'
import { moneyPublicDecimals2 } from 'common/util/money'
import CheckboxField from 'components/common/form/CheckboxField'
import FormSelectField from 'components/common/form/FormSelectField'

export const TaxesCheckbox = () => {
  const { t } = useTranslation('one-time-donation')
  const [amountWithFees] = useField('amountWithFees')
  const [amountWithoutFees] = useField<number>('amountWithoutFees')
  return (
    <>
      <Grid2 container>
        <Grid2 xs={8}>
          <CheckboxField
            name="cardIncludeFees"
            label={<Typography variant="body2">{t('third-step.card-include-fees')}</Typography>}
          />
        </Grid2>
        <Grid2 xs={4}>
          <FormSelectField
            name="cardRegion"
            label={t('third-step.card-region.title')}
            options={[
              {
                key: CardRegion.EU,
                value: CardRegion.EU,
                name: t(`third-step.card-region.${CardRegion.EU}`),
              },
              {
                key: CardRegion.UK,
                value: CardRegion.UK,
                name: t(`third-step.card-region.${CardRegion.UK}`),
              },
              {
                key: CardRegion.Other,
                value: CardRegion.Other,
                name: t(`third-step.card-region.${CardRegion.Other}`),
              },
            ]}
            InputProps={{ style: { fontSize: 14 } }}
          />
        </Grid2>
      </Grid2>
      <Trans
        t={t}
        i18nKey="third-step.card-calculated-fees"
        values={{
          amount: moneyPublicDecimals2(amountWithoutFees.value),
          fees: moneyPublicDecimals2(amountWithFees.value - amountWithoutFees.value),
          totalAmount: moneyPublicDecimals2(amountWithFees.value),
        }}
      />
    </>
  )
}
