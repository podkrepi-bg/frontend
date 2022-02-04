
export type bankAccountResponse = {
  id: UUID
  status: BankAccountStatus
  ibanNumber: string
  accountHolderName: string
  accountHolderType: AccountHolderType
  bankName?: string
  bankIdCode?: string
  fingerprint?: string
  withdraws: Withdrawal[]
}
export type bankAccountType = {
  status: BankAccountStatus
  ibanNumber: string
  accountHolderName: string
  accountHolderType: AccountHolderType
  bankName?: string
  bankIdCode?: string
  fingerprint?: string
  withdrawal:string
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
export type Withdrawal = {
  name: string
}
