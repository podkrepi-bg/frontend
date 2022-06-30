import type { Currency } from './currency'
import { Stripe } from 'stripe'
import { UUID } from './types'
import * as yup from 'yup'
import { PersonResponse } from './person'
import { PaymentProvider } from './donations.enums'

export type DonationPrice = Stripe.Price

export type CheckoutSessionResponse = {
  session: Stripe.Checkout.Session
}

export type CheckoutSessionInput = {
  mode: Stripe.Checkout.Session.Mode
  priceId?: string
  amount?: number
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

export type UserDonationResponse = DonationResponse & {
  person: PersonResponse
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

export type UserDonation = {
  targetVault: {
    campaign: {
      title: string
      id: string
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
  amount: string
  otherAmount: number
  anonymousDonation: boolean
  personFirstName: string
  personLastName: string
  personEmail: string
  personPhone: string
  payment?: 'bank' | 'card'
  loginPassword?: string
  loginEmail?: string
}

export type DonationStep = {
  label: string
  component: JSX.Element
  validate: yup.SchemaOf
}

export type FirstStep = {
  payment: string
  amount?: string
}

export type SecondStep = {
  anonymousDonation?: boolean
  personsFirstName?: string
  personsLastName?: string
  personsPhone?: string
  personsEmail: string
}

export type ThirdStep = {
  message?: string
  anonymous: boolean
}
export type BankTransactionsUploadImage = {
  bankTransactionsFileId: string
}
export type BankTransactionsFileFormData = {
  bankTransactionsFileId: string
}
