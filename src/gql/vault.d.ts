import type { Currency } from './currency'
import { UUID } from './types'

export type VaultResponse = {
  id: UUID
  name: string
  currency: Currency
  amount: number
  blockedAmount: number
  campaignId: UUID
  createdAt: Date
  updatedAt: Date | null
}

export type VaultInput = {
  name?: string
  campaignId?: UUID
  currency?: Currency | ''
}
