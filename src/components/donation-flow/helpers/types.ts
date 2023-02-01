import { CardRegion } from 'gql/donations.enums'

export enum DonationFormDataAuthState {
  LOGIN = 'login',
  REGISTER = 'register',
  AUTHENTICATED = 'authenticated',
  NOREGISTER = 'noregister',
}

export enum DonationFormDataPaymentOption {
  CARD = 'card',
  BANK = 'bank',
}

export type DonationFormDataV2 = {
  //Common fields
  isAnonymous: boolean
  authentication: DonationFormDataAuthState | null
  payment: DonationFormDataPaymentOption | null
  email: string
  privacy: boolean
  //Card fields
  cardRegion?: CardRegion
  cardIncludeFees?: boolean
  finalAmount?: number
  amountChosen?: string
  otherAmount?: number
  //Login fields
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
