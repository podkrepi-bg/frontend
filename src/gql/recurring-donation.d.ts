import type { Currency } from './currency'
import { UUID } from './types'

export type RecurringDonationResponse = {
  id: UUID
  status: RecurringDonationStatus
  personId: UUID
  extSubscriptionId: UUID
  extCustomerId: UUID
  amount: number
  currency: Currency
  sourceVault: UUID
  createdAt: Date
  updatedAt: Date | null
}

export type RecurringDonationInput = {
  status?: RecurringDonationStatus | string
  personId?: UUID
  extSubscriptionId?: UUID
  extCustomerId?: UUID
  amount?: number
  currency?: Currency | string
  sourceVault?: UUID
}
