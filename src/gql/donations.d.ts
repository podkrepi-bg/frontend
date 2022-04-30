import type { Currency } from './currency'
import { Stripe } from 'stripe'
import { UUID } from './types'
import * as yup from 'yup'

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
  personId?: UUID
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
export type DonationBankInput = {
  currency: string
  amount: number
  targetVaultId?: UUID
  extPaymentIntentId?: string
  extPaymentMethodId?: string
  personsEmail: string
  personsFirstName: string
  personsLastName: string
  personsPhone: string
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

export type UserDonation = {
  targetVault: {
    campaign: {
      title: string
    }
  }
  amount: number
  currency: string
  createdAt: string
  id: UUID
  provider: string
  status: string
  type: string
  personId: UUID
}

export type UserDonationResult = {
  donations: UserDonation[]
  total: number
}

export type OneTimeDonation = {
  message?: string
  anonymous: boolean
  amount: number
  anonymousDonation: boolean
  personsFirstName: string
  personsLastName: string
  personsEmail: string
  personsPhone: string
  payment?: 'bank' | 'card'
}

export type DonationStep = {
  label: string
  component: JSX.Element
  validate: yup.SchemaOf
}

export type FirstStep = {
  message?: string
  anonymous: boolean
  amount: number
}

export type SecondStep = {
  anonymousDonation?: boolean
  personsFirstName: string
  personsLastName: string
  personsEmail: string
  personsPhone: string
}

export type ThirdStep = {
  payment: string
}
