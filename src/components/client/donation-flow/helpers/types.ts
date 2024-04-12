import { CardRegion } from 'gql/donations.enums'

export enum DonationFormAuthState {
  LOGIN = 'login',
  REGISTER = 'register',
  AUTHENTICATED = 'authenticated',
  NOREGISTER = 'noregister',
}

export enum DonationFormPaymentMethod {
  CARD = 'card',
  BANK = 'bank',
}

// "canceled" | "processing" | "requires_action" | "requires_capture" | "requires_confirmation" | "requires_payment_method" | "succeeded"
export enum DonationFormPaymentStatus {
  SUCCEEDED = 'succeeded',
  PROCESSING = 'processing',
  // This values is based on what stripe returns https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements&client=react#blik
  REQUIRES_PAYMENT = 'requires_payment_method',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
  REQUIRES_CAPTURE = 'requires_capture',
  REQUIRES_CONFIRMATION = 'requires_confirmation',
}

export type PaymentMode = 'one-time' | 'subscription'
export type DonationFormData = {
  //Common fields
  isAnonymous: boolean
  authentication: DonationFormAuthState | null
  payment: DonationFormPaymentMethod | null
  privacy: boolean
  //Card fields
  mode: PaymentMode | null
  cardRegion?: CardRegion
  cardIncludeFees?: boolean
  finalAmount?: number
  amountChosen?: string
  otherAmount?: number
  //Login fields
  billingEmail: string
  billingName: string
  loginEmail?: string
  loginPassword?: string
  //Register fields
  registerEmail?: string
  registerPassword?: string
  registerConfirmPassword?: string
  registerFirstName?: string
  registerLastName?: string
  registerTerms?: boolean
  registerGdpr?: boolean
}
