import type { Currency } from './currency'
import { UUID } from './types'
import { RecurringDonationStatus } from './recurring-donation-status'

export type RecurringDonationResponse = {
  id: UUID
  status: RecurringDonationStatus
  personId: UUID
  extSubscriptionId: UUID
  extCustomerId: UUID
  amount: number
  currency: Currency
  vaultId: string
  createdAt: Date
  updatedAt: Date | null
}

export type RecurringDonationInput = {
  status?: RecurringDonationStatus
  personId?: UUID
  extSubscriptionId?: UUID
  extCustomerId?: UUID
  amount?: number
  currency?: Currency
  vaultId?: string
}
