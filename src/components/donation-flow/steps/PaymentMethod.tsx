import React, { useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Box, Typography, Unstable_Grid2 as Grid2, useMediaQuery } from '@mui/material'
import { useField, useFormikContext } from 'formik'

import { CardRegion } from 'gql/donations.enums'
import { OneTimeDonation } from 'gql/donations'
import theme from 'common/theme'
import { moneyPublicDecimals2 } from 'common/util/money'
import CheckboxField from 'components/common/form/CheckboxField'
import FormSelectField from 'components/common/form/FormSelectField'

import RadioCardGroup from '../common/RadioCardGroup'
import RadioAccordionGroup from '../common/RadioAccordionGroup'
import CardIcon from '../icons/CardIcon'
import BankIcon from '../icons/BankIcon'
import PaymentDetailsStripeForm from '../stripe/PaymentDetailsStripeForm'
import { DonationFlowContext } from '../DonationFlowContext'

const TaxesCheckbox = () => {
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

export default function PaymentMethod() {
  const formik = useFormikContext<OneTimeDonation>()
  const DonationContext = useContext(DonationFlowContext)
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const [payment] = useField('payment')
  const options = [
    {
      value: 'card',
      label: 'Card',
      icon: <CardIcon sx={{ width: 80, height: 80 }} />,
      disabled: !formik.values.amount,
    },
    {
      value: 'bank',
      label: 'Bank Transfer',
      icon: <BankIcon sx={{ width: 80, height: 80 }} />,
    },
  ]
  const mobileOptions = [
    {
      value: 'card',
      label: 'Card',
      icon: <CardIcon sx={{ width: 80, height: 80 }} />,
      disabled: !formik.values.amount,
      content: (
        <>
          {DonationContext.stripePaymentIntent ? (
            <PaymentDetailsStripeForm
              clientSecret={DonationContext.stripePaymentIntent.client_secret as string}
            />
          ) : null}
        </>
      ),
    },
    {
      value: 'bank',
      label: 'Bank Transfer',
      icon: <BankIcon sx={{ width: 80, height: 80 }} />,
      content: <>TODO: Add Bank Transfer Content</>,
    },
  ]
  return (
    <Box>
      {isSmall ? (
        <RadioAccordionGroup name="payment" options={mobileOptions} />
      ) : (
        <>
          <RadioCardGroup columns={2} name="payment" options={options} />
          {payment.value === 'card' && DonationContext.stripePaymentIntent ? (
            <>
              <PaymentDetailsStripeForm
                containerProps={{ sx: { mb: 3 } }}
                clientSecret={DonationContext.stripePaymentIntent.client_secret as string}
              />
              <TaxesCheckbox />
            </>
          ) : null}
        </>
      )}
    </Box>
  )
}
