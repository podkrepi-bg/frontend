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
  // type?: VaultsType | ''
  // name?: string
  // filename?: string
  // filetype?: string
  // description?: string
  // sourceUrl?: string
}

export type VaultData = {
  // type: VaultsType
  // name: string
  // filename: string
  // filetype: string
  // description: string
  // sourceUrl: string
}

enum Currency {
  'BGN',
  'EUR',
  'USD',
}
