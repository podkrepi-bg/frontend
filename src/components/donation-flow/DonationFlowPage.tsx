import Stripe from 'stripe'
import { useViewCampaign } from 'common/hooks/campaigns'

import { DonationFlowForm } from './DonationFlowForm'
import { DonationFlowProvider } from './contexts/DonationFlowProvider'
import { StripeElementsProvider } from './contexts/StripeElementsProvider'
import DonationFlowLayout from './DonationFlowLayout'
import { CampaignResponse } from 'gql/campaigns'

export default function DonationFlowPage({
  slug,
  paymentIntent,
}: {
  slug: string
  paymentIntent: Stripe.PaymentIntent
}) {
  const { data } = useViewCampaign(slug)
  //This query needs to be prefetched in the pages folder
  //otherwise on the first render the data will be undefined
  const campaign = data?.campaign as CampaignResponse
  return (
    <DonationFlowProvider campaign={campaign} paymentIntent={paymentIntent}>
      <StripeElementsProvider>
        <DonationFlowLayout campaign={campaign}>
          <DonationFlowForm />
        </DonationFlowLayout>
      </StripeElementsProvider>
    </DonationFlowProvider>
  )
}
