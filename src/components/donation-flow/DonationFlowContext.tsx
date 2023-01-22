import React, { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { useViewCampaign } from 'common/hooks/campaigns'
import CenteredSpinner from 'components/common/CenteredSpinner'
import { CampaignResponse } from 'gql/campaigns'
import Stripe from 'stripe'
import { loadStripe, Stripe as StripeType } from '@stripe/stripe-js'
import getConfig from 'next/config'
const {
  publicRuntimeConfig: { STRIPE_PUBLIC_KEY },
} = getConfig()

type DonationContext = {
  stripePaymentIntent: Stripe.PaymentIntent | null
  setStripePaymentIntent: React.Dispatch<React.SetStateAction<Stripe.PaymentIntent | null>>
  campaign: CampaignResponse
  stripePromise: Promise<StripeType | null>
}

export const DonationFlowContext = React.createContext({} as DonationContext)

export const DonationFlowProvider = ({ children }: PropsWithChildren) => {
  //get the campaign with react-query and pass it to the context
  const router = useRouter()
  const slug = String(router.query.slug)
  const { data, isLoading } = useViewCampaign(slug)
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)
  const [stripePaymentIntent, setStripePaymentIntent] =
    React.useState<Stripe.PaymentIntent | null>(null)
  if (isLoading || !data) return <CenteredSpinner size="2rem" />
  const { campaign } = data
  const value = {
    stripePaymentIntent,
    setStripePaymentIntent,
    campaign,
    stripePromise,
  }
  return <DonationFlowContext.Provider value={value}>{children}</DonationFlowContext.Provider>
}
