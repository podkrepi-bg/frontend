import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import { useFormikContext } from 'formik'

import { OneTimeDonation } from 'gql/donations'
import useMobile from 'common/hooks/useMobile'
import RadioCardGroup from '../common/RadioCardGroup'
import CardIcon from '../icons/CardIcon'
import BankIcon from '../icons/BankIcon'
import PaymentDetailsStripeForm from '../stripe/PaymentDetailsStripeForm'
import { DonationFlowContext } from '../DonationFlowContext'
import RadioAccordionGroup from '../common/RadioAccordionGroup'

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
  const { small } = useMobile()
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
    <Root>
      {small ? (
        <RadioAccordionGroup name="payment" options={mobileOptions} />
      ) : (
        <>
          <RadioCardGroup columns={2} name="payment" options={options} />
          {DonationContext.stripePaymentIntent ? (
            <PaymentDetailsStripeForm
              clientSecret={DonationContext.stripePaymentIntent.client_secret as string}
            />
          ) : null}
        </>
      )}
    </Root>
  )
}
