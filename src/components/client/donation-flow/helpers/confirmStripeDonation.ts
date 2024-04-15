import { DonationFormData, DonationFormPaymentStatus, PaymentMode } from './types'
import { createIntentFromSetup } from 'service/donation'
import { CampaignResponse } from 'gql/campaigns'
import { routes } from 'common/routes'
import { Stripe, StripeElements } from '@stripe/stripe-js'
import type StripeJS from 'stripe'
import { Session } from 'next-auth'

export async function confirmStripePayment(
  setupIntent: StripeJS.SetupIntent,
  elements: StripeElements,
  stripe: Stripe,
  campaign: CampaignResponse,
  values: DonationFormData,
  session: Session | null,
  idempotencyKey: string,
): Promise<StripeJS.PaymentIntent> {
  if (setupIntent.status !== DonationFormPaymentStatus.SUCCEEDED) {
    const { error: intentError } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${routes.campaigns.donationStatus(campaign.slug)}`,
        payment_method_data: {
          billing_details: { name: values.billingName, email: values.billingEmail },
        },
      },
      redirect: 'if_required',
    })
    if (intentError) {
      throw intentError
    }
  }
  const payment = await createIntentFromSetup(
    setupIntent.id,
    idempotencyKey,
    values.mode as PaymentMode,
    session,
  )

  if (payment.data.status === DonationFormPaymentStatus.REQUIRES_ACTION) {
    const { error } = await stripe.confirmCardPayment(payment.data.client_secret as string)
    if (error) throw error
    sessionStorage.removeItem('donation-form')
  }
  return payment.data
}
