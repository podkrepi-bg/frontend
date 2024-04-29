import type { Currency } from './currency'
import { Stripe } from 'stripe'
import { UUID } from './types'
import * as yup from 'yup'
import { PersonResponse } from './person'
import {
  PaymentProvider,
  CardRegion,
  DonationType,
  PaymentStatus,
  PaymentType,
} from './donations.enums'

export type DonationPrice = Stripe.Price

export type StripePaymentInput = {
  setupIntentId: Stripe.SetupIntent['id']
  firstName: string | null
  lastName: string | null
  phone: string | null
  personEmail: string
  isAnonymous: boolean
  amount: number
}

export type SubscriptionPaymentInput = {
  type: DonationType
  campaignId: string
  amount: number
  currency: Currency
  email?: string
}

export type UpdatePaymentIntentInput = {
  id: string
  payload: Stripe.PaymentIntentUpdateParams
}

export type CancelSetupIntentInput = {
  id: string
}

export type UpdateSetupIntentInput = {
  id: string
  idempotencyKey: string
  payload: Stripe.SetupIntentUpdateParams
}

export type CancelPaymentIntentInput = {
  id: string
  payload: Stripe.PaymentIntentCancelParams
}

export type CheckoutSessionResponse = {
  session: Stripe.Checkout.Session
}

export type CheckoutSessionInput = {
  type: DonationType
  mode: Stripe.Checkout.Session.Mode
  amount?: number
  campaignId: string
  personId: string
  successUrl?: string
  cancelUrl?: string
  firstName?: string
  lastName?: string
  personEmail?: string
  isAnonymous: boolean
  phone?: string | null
  message?: string
}

export type TPaymentResponse = {
  id: UUID
  type: PaymentType
  status: PaymentStatus
  provider: PaymentProvider
  extCustomerId: string
  amount: number
  currency: Currency
  extPaymentIntentId: string
  extPaymentMethodId: string
  billingName: string
  billingEmail: string
  updatedAt: Date
  createdAt: Date
}

export type PaymentWithDonations = TPaymentResponse & {
  donations: DonationResponse[]
}

export type DonationResponse = {
  id: UUID
  type: DonationType
  paymentId: UUID
  targetVaultId: UUID
  createdAt: DateTime
  updatedAt: DateTime
  amount: number
  personId?: UUID
  person: {
    id: string
    firstName: string
    lastName: string
    company: {
      companyName: string
    }
  } | null
  targetVault?: {
    id: string
    campaign?: {
      id: string
      slug: string
      title: string
    }
  }
}

export type UserDonationResponse = DonationResponse & {
  person: PersonResponse
}

export type DonationInput = {
  type: string
  status: string
  provider: string
  currency: string
  createdAt: Date
  amount: number
  targetVaultId: UUID
  extCustomerId: string
  extPaymentIntentId: string
  extPaymentMethodId: string
  // personId: UUID
}
export type UserDonationInput = DonationInput & {
  targetPersonId?: UUID
  billingEmail?: string
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

export type UserDonation = {
  targetVault: {
    campaign: {
      title: string
      id: string
      slug: string
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
  payment: PaymentsResponse
}

export type UserDonationResult = {
  donations: UserDonation[]
  total: number
}

export type TotalDonatedMoneyResponse = {
  total: number
}

export type DonorsCountResult = {
  count: number
}

export type OneTimeDonation = {
  type: ProfileType
  message?: string
  isAnonymous: boolean
  isRecurring: boolean
  amount: string
  amountWithFees: number
  otherAmount: number
  personsFirstName: string
  personsLastName: string
  personsEmail: string
  personsPhone: string
  payment?: 'bank' | 'card'
  cardRegion: CardRegion
  cardIncludeFees: boolean
  loginPassword?: string
  loginEmail?: string
  registerFirstName?: string
  registerLastName?: string
  registerEmail?: string
  registerPassword?: string
  confirmPassword?: string
  terms?: boolean
  gdpr?: boolean
  newsletter?: boolean
}

export type DonationStep = {
  label: string
  component: JSX.Element
  validate: yup.SchemaOf
}

export type FirstStep = {
  payment?: string
  amount?: string
}

export type SecondStep = {
  isAnonymous: boolean
  personsFirstName?: string
  personsLastName?: string
  personsPhone?: string
  personsEmail?: string
  terms?: boolean
  gdpr?: boolean
  newsletter?: boolean
}

export type ThirdStep = {
  message?: string
}

export type StripeRefundResponse = {
  id: UUID
  object: string
  amount: number
  balance_transaction: string
  charge: string
  created: number
  currency: string
  payment_intent: string
  reason: string
  receipt_number: string
  source_transfer_reversal: string
  status: PaymentStatus
  transfer_reversal: string
}

export type StripeRefundRequest = {
  extPaymentIntentId: string
}

export type BankTransactionsFileFormData = {
  bankTransactionsFileId: string
}

enum ImportStatus {
  UNPROCESSED = 'UNPROCESSED',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  UPDATED = 'UPDATED',
}

export type BankImportResult = {
  status: ImportStatus
  message?: string
  amount: number
  currency: string
  createdAt: Date
  extPaymentIntentId: string
}

export type PaymentsWithDonationCountResponse = TPaymentResponse & {
  _count: number
}

export type PaymentAdminResponse = {
  items: PaymentAdminResponse[]
  total: number
}
