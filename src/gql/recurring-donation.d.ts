import type { Currency } from './currency'
import { UUID } from './types'
import { VaultResponse } from './vault'

export type Campaign = {
  title: string
}

export type RecurringDonationResponse = {
  id: UUID
  status: RecurringDonationStatus
  personId: UUID
  extSubscriptionId: UUID
  extCustomerId: UUID
  amount: number
  currency: Currency
  sourceVault: VaultResponse
  campaign: Campaign
  person: Person
  campaignId: UUID
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
  money: number
  campaign: string
}
