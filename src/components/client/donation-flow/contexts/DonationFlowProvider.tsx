import React, { PropsWithChildren } from 'react'
import Stripe from 'stripe'
import { Stripe as StripeType, StripeError } from '@stripe/stripe-js'

import { stripe } from 'service/stripeClient'
import { CampaignResponse } from 'gql/campaigns'

type DonationContext = {
  setupIntent: Stripe.SetupIntent
  paymentError: StripeError | null
  setPaymentError: React.Dispatch<React.SetStateAction<StripeError | null>>
  campaign: CampaignResponse
  stripe: Promise<StripeType | null>
}

const DonationFlowContext = React.createContext({} as DonationContext)

export const DonationFlowProvider = ({
  campaign,
  setupIntent,
  children,
}: PropsWithChildren<{
  campaign: CampaignResponse
  setupIntent: Stripe.SetupIntent
}>) => {
  const [paymentError, setPaymentError] = React.useState<StripeError | null>(null)

  const value = {
    setupIntent,
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
