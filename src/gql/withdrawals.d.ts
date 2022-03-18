import { Person } from 'components/support-form/helpers/support-form.types'
import { WithdrawalStatus, Currency } from 'components/withdrawals/WithdrawalTypes'
import { UUID } from './types'
export type WithdrawalResponse = {
  id: UUID
  status: WithdrawalStatus
  currency: Currency
  amount: number
  reason: string
  documentId: UUID
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
  approvedBy: string
  bankAccount: string
  sourceCampaign: string
  sourceVault: string
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
  status: string | undefined
  currency: string | undefined
  amount: number | undefined
  reason: string | undefined
  documentId?: string | undefined
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
  approvedById: UUID
  bankAccountId: UUID
  sourceCampaignId: UUID
  sourceVaultId: UUID
}
