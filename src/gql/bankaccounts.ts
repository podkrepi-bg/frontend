import { BankAccountStatus, AccountHolderType } from 'components/bankaccounts/BankAccountTypes'
import { UUID } from './types'
export type BankAccountResponse = {
  id: UUID
  status: BankAccountStatus
  ibanNumber: string
  accountHolderName: string
  accountHolderType: AccountHolderType
  bankName?: string
  bankIdCode?: string
  fingerprint?: string
  createdAt: string
  updatedAt: string
  withdraws: []
}
export type BankAccountInput = {
  status: BankAccountStatus | undefined
  ibanNumber: string | undefined
  accountHolderName: string | undefined
  accountHolderType: AccountHolderType | undefined
  bankName?: string | undefined
  bankIdCode?: string | undefined
  fingerprint?: string | undefined
}

export type BankAccountsData = {
  status: string
  ibanNumber: string
  accountHolderName: string
  AccountHolderType: string
  bankName: string
  bankIdCode: string
  fingerprint: string
}
