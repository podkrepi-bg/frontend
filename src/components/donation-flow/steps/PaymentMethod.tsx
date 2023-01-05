import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import { useFormikContext } from 'formik'

import { OneTimeDonation } from 'gql/donations'
import RadioCardGroup from '../common/RadioCardGroup'
import CardIcon from '../icons/CardIcon'
import BankIcon from '../icons/BankIcon'
import PaymentDetailsStripeForm from '../stripe/PaymentDetailsStripeForm'
import { DonationFlowContext } from '../DonationFlowContext'

const PREFIX = 'AMOUNT'

const classes = {
  divider: `${PREFIX}-divider`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.divider}`]: {
    border: '1px solid #000000',
  },
}))

export default function PaymentMethod() {
  const formik = useFormikContext<OneTimeDonation>()
  const DonationContext = useContext(DonationFlowContext)
  if (!DonationContext.stripePaymentIntent) {
    return null
  }
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
  return (
    <Root>
      <RadioCardGroup columns={2} name="payment" options={options} />
      {DonationContext.stripePaymentIntent ? (
        <PaymentDetailsStripeForm
          clientSecret={DonationContext.stripePaymentIntent.client_secret as string}
        />
      ) : (
        'There is a problem with picking your price. Please try again later.'
      )}
    </Root>
  )
}
