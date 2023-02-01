import React, { PropsWithChildren } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { loadStripe, Stripe as StripeType, StripeError } from '@stripe/stripe-js'

import { useViewCampaign } from 'common/hooks/campaigns'
import CenteredSpinner from 'components/common/CenteredSpinner'
import { CampaignResponse } from 'gql/campaigns'
const {
  publicRuntimeConfig: { STRIPE_PUBLIC_KEY },
} = getConfig()

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

type DonationContext = {
  stripePaymentIntent: Stripe.PaymentIntent | null
  setStripePaymentIntent: React.Dispatch<React.SetStateAction<Stripe.PaymentIntent | null>>
  paymentError: StripeError | null
  setPaymentError: React.Dispatch<React.SetStateAction<StripeError | null>>
  campaign: CampaignResponse
  stripePromise: Promise<StripeType | null>
}

export const DonationFlowContext = React.createContext({} as DonationContext)

export const DonationFlowProvider = ({ children }: PropsWithChildren) => {
  //get the campaign with react-query and pass it to the context
  const router = useRouter()
  const slug = String(router.query.slug)
  const { data, isLoading } = useViewCampaign(slug)
  const [stripePaymentIntent, setStripePaymentIntent] =
    React.useState<Stripe.PaymentIntent | null>(null)
  const [paymentError, setPaymentError] = React.useState<StripeError | null>(null)
  if (isLoading || !data) return <CenteredSpinner size="2rem" />
  const { campaign } = data
  const value = {
    stripePaymentIntent,
    setStripePaymentIntent,
    paymentError,
    setPaymentError,
    campaign,
    stripePromise,
  }
  return <DonationFlowContext.Provider value={value}>{children}</DonationFlowContext.Provider>
}
