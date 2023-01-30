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
  isAnonymous: boolean
  authentication: DonationFormDataAuthState | null
  payment: DonationFormDataPaymentOption | null
  email: string
  cardRegion: CardRegion
  cardIncludeFees: boolean
  privacy: boolean
  amount?: string
  amountWithFees?: number
  otherAmount?: number
}
