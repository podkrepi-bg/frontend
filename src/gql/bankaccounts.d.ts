export type BankAccountResponse = {
  id: UUID
  status: BankAccountStatus
  ibanNumber: string
  accountHolderName: string
  AccountHolderType: AccountHolderType
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
  AccountHolderType: AccountHolderType | undefined
  bankName?: string | undefined
  bankIdCode?: string | undefined
  fingerprint?: string | undefined
  withdrawal: Withdrawal | undefined
}


export type BankAccountsData = {
  status: string
  ibanNumber: string
  accountHolderName: string
  AccountHolderType: string
  bankName: string
  bankIdCode: string
  fingerprint: string
  withdrawal: string
}
