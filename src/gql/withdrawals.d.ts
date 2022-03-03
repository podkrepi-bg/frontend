import { WithdrawalStatus, Currency } from 'components/withdrawals/WithdrawalTypes'
import { UUID } from './types'
export type WithdrawalResponse = {
  id: UUID
  status: WithdrawalStatus
  currency: Currency
  amount: number
  reason: string
  documentId: UUID
  approvedBy: UUID
  bankAccount: UUID
  sourceCampaign: UUID
  sourceVault: UUID
}
export type WithdrawalInput = {
  status: WithdrawalStatus | undefined
  currency: Currency | undefined
  amount: number | undefined
  reason: string | undefined
  documentId?: UUID | undefined
  approvedBy?: UUID | undefined
  bankAccount?: UUID | undefined
  sourceCampaign?: UUID | undefined
  sourceVault?: UUID | undefined
}

export type WithdrawalData = {
  status: WithdrawalStatus
  currency: Currency
  amount: number
  reason: string
  documentId?: UUID
  approvedBy?: UUID
  bankAccount?: UUID
  sourceCampaign?: UUID
  sourceVault?: UUID
}
