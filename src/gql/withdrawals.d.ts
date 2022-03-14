import { WithdrawalStatus, Currency } from 'components/withdrawals/WithdrawalTypes'
import { UUID } from './types'
export type WithdrawalResponse = {
  id: UUID
  status: WithdrawalStatus
  currency: Currency
  amount: number
  reason: string
  documentId: UUID
  approvedBy: Record<string, unknown>
  bankAccount: Record<string, unknown>
  sourceCampaign: Record<string, unknown>
  sourceVault: Record<string, unknown>
}
export type WithdrawalInput = {
  status: WithdrawalStatus | undefined
  currency: Currency | undefined
  amount: number | undefined
  reason: string | undefined
  documentId?: UUID | undefined
  approvedById?: UUID | undefined
  bankAccountId?: UUID | undefined
  sourceCampaignId?: UUID | undefined
  sourceVaultId?: UUID | undefined
}

export type WithdrawalData = {
  status: WithdrawalStatus
  currency: Currency
  amount: number
  reason: string
  documentId?: UUID
  approvedBy?: Record<string, unknown>
  bankAccount?: Record<string, unknown>
  sourceCampaign?: Record<string, unknown>
  sourceVault?: Record<string, unknown>
}

export type WithdrawalEditResponse = {
  id: UUID
  status: WithdrawalStatus
  currency: Currency
  amount: number
  reason: string
  documentId: UUID
  approvedById: UUID
  bankAccountId: UUID
  sourceCampaignId: UUID
  sourceVaultId: UUID
}
