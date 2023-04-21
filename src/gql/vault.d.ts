import type { Currency } from './currency'
import { UUID } from './types'

export type VaultResponse = {
  id: UUID
  name: string
  currency: Currency
  amount: number
  blockedAmount: number
  campaignId: UUID
  campaign: Campaign
  createdAt: Date
  updatedAt: Date | null
}

export type VaultInput = {
  id: UUID
  name?: string
  campaignId?: UUID
  currency?: Currency | ''
}
