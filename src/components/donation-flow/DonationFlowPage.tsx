import Stripe from 'stripe'
import { useViewCampaign } from 'common/hooks/campaigns'
import CenteredSpinner from 'components/common/CenteredSpinner'

import { DonationFlowForm } from './DonationFlowForm'
import { DonationFlowProvider } from './contexts/DonationFlowProvider'
import { StripeElementsProvider } from './contexts/StripeElementsProvider'
import DonationFlowLayout from './DonationFlowLayout'

export default function DonationFlowPage({
  slug,
  paymentIntent,
}: {
  slug: string
  paymentIntent: Stripe.PaymentIntent
}) {
  const { data, isLoading } = useViewCampaign(slug)
  if (isLoading || !data) return <CenteredSpinner size="2rem" />
  return (
    <DonationFlowProvider paymentIntent={paymentIntent}>
      <StripeElementsProvider>
        <DonationFlowLayout>
          <DonationFlowForm />
        </DonationFlowLayout>
      </StripeElementsProvider>
    </DonationFlowProvider>
  )
}
