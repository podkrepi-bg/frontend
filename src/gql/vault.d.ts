import { UUID } from './types'

export type VaultResponse = {
  id: UUID
  name: string
  currency: Currency
  amount: number
  campaignId: UUID
  createdAt: Date
  updatedAt: Date | null
}

export type VaultInput = {
  name?: string
  campaignId?: UUID
  currency?: Currency | ''
}

enum Currency {
  'BGN',
  'EUR',
  'USD',
}
