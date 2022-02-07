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
  withdraws: Withdrawal[]
}
export type BankAccountInput = {
  status: BankAccountStatus | undefined
  ibanNumber: string | undefined
  accountHolderName: string | undefined
  accountHolderType: AccountHolderType | undefined
  bankName?: string | undefined
  bankIdCode?: string | undefined
  fingerprint?: string | undefined
  withdrawal: Withdrawal | undefined
}
export enum BankAccountStatus {
  new,
  validated,
  verified,
  verification_failed,
  errored,
}
export enum AccountHolderType {
  individual,
  company,
}

export type BankAccountsData = {
  status: string
  ibanNumber: string
  accountHolderName: string
  accountHolderType: string
  bankName: string
  bankIdCode: string
  fingerprint: string
  withdrawal: string
}
