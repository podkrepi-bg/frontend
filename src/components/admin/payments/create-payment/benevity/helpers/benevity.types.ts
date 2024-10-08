export type TBenevityCSVParser = {
  charityName: string
  charityId: string
  periodEnding: string
  currency: string
  paymentMethod: string
  disbursementId: string
  totalDonationsGross: string
  checkFee: string
  note: string
  netTotalPayment: number
  transactionAmount: number
  exchangeRate: number
  donations: TBenevityDonation[]
}

export type TBenevityDonation = {
  company: string
  project: string
  donationDate: string
  donorFirstName: string
  donorLastName: string
  email: string
  address: string
  city: string
  stateProvince: string
  postalCode: string
  activity: string
  comment: string
  transactionId: string
  donationFrequency: string
  currency: string
  projectRemoteId: string
  source: string
  reason: string
  totalDonationToBeAcknowledged: number
  matchAmount: number
  causeSupportFee: number
  merchantFee: number
  feeComment: string
  totalFee: number
  totalAmount: number
}

export type BenevityDonation = Pick<
  TBenevityDonation,
  'email' | 'donorFirstName' | 'donorLastName' | 'totalAmount' | 'projectRemoteId' | 'transactionId'
>

export type BenevityImportInput = {
  amount: number
  transactionId: string
  exchangeRate: number
  currency: string
  benevityData: TBenevityCSVParser
}

export type BenevityRequest = {
  amount: number
  extPaymentIntentId: string
  exchangeRate: number
  benevityData: Pick<TBenevityCSVParser, 'donations'>
}
