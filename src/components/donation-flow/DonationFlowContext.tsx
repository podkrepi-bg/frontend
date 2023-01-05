import React, { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { useViewCampaign } from 'common/hooks/campaigns'
import CenteredSpinner from 'components/common/CenteredSpinner'
import { CampaignResponse } from 'gql/campaigns'

type DonationContext = {
  stripePaymentIntentId: string
  setStripePaymentIntentId: React.Dispatch<React.SetStateAction<string>>
  campaign: CampaignResponse
}

export const DonationFlowContext = React.createContext({} as DonationContext)

export const DonationFlowProvider = ({ children }: PropsWithChildren) => {
  //get the campaign with react-query and pass it to the context
  const router = useRouter()
  const slug = String(router.query.slug)
  const { data, isLoading } = useViewCampaign(slug)
  const [stripePaymentIntentId, setStripePaymentIntentId] = React.useState('')
  if (isLoading || !data) return <CenteredSpinner size="2rem" />
  const { campaign } = data
  const value = { stripePaymentIntentId, setStripePaymentIntentId, campaign }
  return <DonationFlowContext.Provider value={value}>{children}</DonationFlowContext.Provider>
}
