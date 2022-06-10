export enum BankTransactionsFileRole {
  xml = 'xml',
  other = 'other',
}

export type FileRole = {
  file: string
  role: BankTransactionsFileRole
}

export type UploadBankTransactionFiles = {
  bankTransactionsFileId: string
  files: File[]
  roles: FileRole[]
}
