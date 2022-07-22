export enum DonationType {
  donation = 'donation',
}

export enum DonationStatus {
  initial = 'initial',
  invalid = 'invalid',
  incomplete = 'incomplete',
  declined = 'declined',
  waiting = 'waiting',
  cancelled = 'cancelled',
  succeeded = 'succeeded',
  deleted = 'deleted',
  refund = 'refund',
  paymentRequested = 'paymentRequested',
}

export enum PaymentProvider {
  none = 'none',
  stripe = 'stripe',
  paypal = 'paypal',
  epay = 'epay',
  bank = 'bank',
  cash = 'cash',
}

export enum CardRegion {
  EU = 'EU',
  UK = 'UK',
  Other = 'Other',
}
