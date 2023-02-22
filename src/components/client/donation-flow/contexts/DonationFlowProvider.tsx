import React, { PropsWithChildren } from 'react'
import Stripe from 'stripe'
import { Stripe as StripeType, StripeError } from '@stripe/stripe-js'

import { stripe } from 'service/stripeClient'
import { CampaignResponse } from 'gql/campaigns'

type DonationContext = {
  stripePaymentIntent: Stripe.PaymentIntent
  paymentError: StripeError | null
  setPaymentError: React.Dispatch<React.SetStateAction<StripeError | null>>
  campaign: CampaignResponse
  stripe: StripeType | null
}

const DonationFlowContext = React.createContext({} as DonationContext)

export const DonationFlowProvider = ({
  campaign,
  paymentIntent,
  children,
}: PropsWithChildren<{
  campaign: CampaignResponse
  paymentIntent: Stripe.PaymentIntent
}>) => {
  const [paymentError, setPaymentError] = React.useState<StripeError | null>(null)
  const value = {
    stripePaymentIntent: paymentIntent,
    paymentError,
    setPaymentError,
    campaign,
    stripe,
  }
  return <DonationFlowContext.Provider value={value}>{children}</DonationFlowContext.Provider>
}

export function useDonationFlow() {
  const context = React.useContext(DonationFlowContext)
  if (context === undefined) {
    throw new Error('useDonationFlow must be used within a DonationFlowProvider')
  }
  return context
}
