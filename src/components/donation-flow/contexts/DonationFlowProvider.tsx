import React, { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { Stripe as StripeType, StripeError } from '@stripe/stripe-js'

import { useViewCampaign } from 'common/hooks/campaigns'
import CenteredSpinner from 'components/common/CenteredSpinner'
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
  paymentIntent,
  children,
}: PropsWithChildren<{
  paymentIntent: Stripe.PaymentIntent
}>) => {
  const router = useRouter()
  const slug = String(router.query.slug)
  const { data, isLoading } = useViewCampaign(slug)
  const [paymentError, setPaymentError] = React.useState<StripeError | null>(null)
  if (isLoading || !data) return <CenteredSpinner size="2rem" />
  const { campaign } = data
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
