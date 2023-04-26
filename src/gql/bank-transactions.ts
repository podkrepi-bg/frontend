import { Currency } from './currency'

export type BankDonationStatus = 'unrecognized' | 'imported' | 'importFailed' | ''

export type BankTransactionType = 'debit' | 'credit'

export class BankTransactionsInput {
  id: string
  ibanNumber: string
  bankName: string
  bankIdCode: string
  transactionDate: Date
  senderName: string | null
  recipientName: string | null
  senderIban: string | null
  recipientIban: string | null
  amount: number
  currency: Currency
  description: string
  type: BankTransactionType
  bankDonationStatus: BankDonationStatus | null
}

export type BankTransactionsHistoryResponse = {
  items: BankTransactionsInput[]
  total: number
}

export type BankTransactionEditRefInput = {
  paymentRef: string
}

export type BankTransactionEditRefResponse = {
  trxId: string
  paymentRef: string
  status: string
}
