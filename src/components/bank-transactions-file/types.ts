export enum BankTransactionsFileType {
  xml = 'xml',
  other = 'other',
}

export type FileType = {
  file: string
  type: BankTransactionsFileType
}

export type UploadBankTransactionsFiles = {
  bankTransactionsFileId: string
  files: File[]
  types: FileType[]
}
