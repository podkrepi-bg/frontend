import React, { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { useViewCampaign } from 'common/hooks/campaigns'
import CenteredSpinner from 'components/common/CenteredSpinner'
import { CampaignResponse } from 'gql/campaigns'
import Stripe from 'stripe'

type DonationContext = {
  stripePaymentIntent: Stripe.PaymentIntent | null
  setStripePaymentIntent: React.Dispatch<React.SetStateAction<Stripe.PaymentIntent | null>>
  campaign: CampaignResponse
}

export const DonationFlowContext = React.createContext({} as DonationContext)

export const DonationFlowProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const slug = String(router.query.slug)
  const { data, isLoading } = useViewCampaign(slug)
  const [stripePaymentIntent, setStripePaymentIntent] =
    React.useState<Stripe.PaymentIntent | null>(null)
  if (isLoading || !data) return <CenteredSpinner size="2rem" />
  const { campaign } = data
  const value = {
    stripePaymentIntent,
    setStripePaymentIntent,
    campaign,
  }
  return <DonationFlowContext.Provider value={value}>{children}</DonationFlowContext.Provider>
}
