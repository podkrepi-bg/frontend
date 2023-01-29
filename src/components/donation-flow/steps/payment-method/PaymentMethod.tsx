import React, { useContext } from 'react'
import { Typography, useMediaQuery } from '@mui/material'
import { useField, useFormikContext } from 'formik'

import { OneTimeDonation } from 'gql/donations'
import theme from 'common/theme'

import { TaxesCheckbox } from './TaxesCheckbox'
import RadioCardGroup from '../../common/RadioCardGroup'
import RadioAccordionGroup from '../../common/RadioAccordionGroup'
import CardIcon from '../../icons/CardIcon'
import BankIcon from '../../icons/BankIcon'
import PaymentDetailsStripeForm from './PaymentDetailsStripeForm'
import { DonationFlowContext } from '../../DonationFlowContext'

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
      content: <>{DonationContext.stripePaymentIntent ? <PaymentDetailsStripeForm /> : null}</>,
    },
    {
      value: 'bank',
      label: 'Bank Transfer',
      icon: <BankIcon sx={{ width: 80, height: 80 }} />,
      content: <>TODO: Add Bank Transfer Content</>,
    },
  ]
  return (
    <>
      <Typography mb={3} variant="h5">
        Как желаете да дарите?
      </Typography>
      {isSmall ? (
        <RadioAccordionGroup name="payment" options={mobileOptions} />
      ) : (
        <>
          <RadioCardGroup columns={2} name="payment" options={options} />
          {payment.value === 'card' && DonationContext.stripePaymentIntent ? (
            <>
              <PaymentDetailsStripeForm containerProps={{ sx: { my: 3 } }} />
              <TaxesCheckbox />
            </>
          ) : null}
        </>
      )}
    </>
  )
}
