import { WithdrawalStatus, Currency } from 'components/admin/withdrawals/WithdrawalTypes'
import { Person } from './person'
import { UUID } from './types'

export type WithdrawalResponse = {
  id: UUID
  status: WithdrawalStatus
  currency: Currency
  amount: number
  reason: string
  documentId: UUID
  targetDate: Date
  approvedBy: Person
  bankAccount: Record<string, unknown>
  sourceCampaign: Record<string, unknown>
  sourceVault: Record<string, unknown>
}
export type WithdrawalResponse2 = {
  id: UUID
  status: string
  currency: string
  amount: number
  reason: string
  documentId: UUID
  targetDate: Date
  approvedBy: string
  bankAccount: string
  sourceCampaign: string
  sourceVault: string
}
export type WithdrawalInput = {
  status: WithdrawalStatus | undefined
  currency: Currency | undefined
  amount: number
  amountAvailable: number
  reason: string | undefined
  documentId?: UUID | undefined
  targetDate: Date | string
  approvedById?: UUID | undefined
  bankAccountId?: UUID | undefined
  sourceCampaignId?: UUID | undefined
  sourceVaultId?: UUID | undefined
}

export type WithdrawalData = {
  status: string | undefined
  currency: string | undefined
  amount: number | undefined
  reason: string | undefined
  documentId?: string | undefined
  targetDate: Date | string
  approvedById?: string | undefined
  bankAccountId?: string | undefined
  sourceCampaignId?: string | undefined
  sourceVaultId?: string | undefined
}

export type WithdrawalEditResponse = {
  id: UUID
  status: WithdrawalStatus
  currency: Currency
  amount: number
  reason: string
  documentId: UUID
  targetDate: Date
  approvedById: UUID
  bankAccountId: UUID
  sourceCampaignId: UUID
  sourceVaultId: UUID
}
