import { Stripe } from 'stripe'
import { UUID } from './types'

export type DonationPrice = Stripe.Price

export type CheckoutSessionResponse = {
  session: Stripe.Checkout.Session
}

export type CheckoutSessionInput = {
  mode: Stripe.Checkout.Session.Mode
  priceId: string
  campaignId: string
  successUrl?: string
  cancelUrl?: string
}

export type DonationResponse = {
  id: UUID
  type: DonationType
  status: DonationStatus
  provider: PaymentProvider
  targetVaultId: UUID
  extCustomerId: string
  extPaymentIntentId: string
  extPaymentMethodId: string
  createdAt: DateTime
  updatedAt: DateTime
  currency: Currency
  amount: number
  personId: UUID
}

export type DonationInput = {
  type: string
  status: string
  provider: string
  currency: string
  amount: number
  targetVaultId: UUID
  extCustomerId: string
  extPaymentIntentId: string
  extPaymentMethodId: string
  // personId: UUID
}

enum DonationType {
  'donation',
}

enum DonationStatus {
  'initial',
  'invalid',
  'incomplete',
  'declined',
  'waiting',
  'cancelled',
  'succeeded',
  'deleted',
  'refund',
  'paymentRequested',
}

enum PaymentProvider {
  'none',
  'stripe',
  'paypal',
  'epay',
  'bank',
  'cash',
}

enum Currency {
  'BGN',
  'EUR',
  'USD',
}

export type UserDonation = {
  targetVault: {
    campaign: {
      title: string
    }
  }
  amount: number
  currency: number
  createdAt: string
}

export type UserDonationResult = {
  donations: UserDonation[]
  total: number
}
