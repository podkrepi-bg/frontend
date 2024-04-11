import { Currency } from './currency'
import { UUID } from './types'

export type ExpenseInput = {
  type: ExpenseType | string
  status: ExpenseStatus | string
  currency: Currency | string
  amount: number
  money: number
  vaultId: UUID
  deleted: boolean
  description?: string
  documentId?: UUID | null
  approvedById?: UUID | null
  approved?: boolean
  spentAt: string
}

export type ExpenseResponse = {
  id: UUID
  type: ExpenseType
  status: ExpenseStatus
  currency: Currency
  amount: number
  vaultId: UUID
  deleted: boolean
  description?: string
  documentId?: UUID | null
  approvedById?: UUID | null
  spentAt: string
  expenseFiles: ExpenseFile[]
}

export enum ExpenseType {
  none = 'none',
  internal = 'internal',
  operating = 'operating',
  administrative = 'administrative',
  medical = 'medical',
  services = 'services',
  groceries = 'groceries',
  transport = 'transport',
  accommodation = 'accommodation',
  shipping = 'shipping',
  utility = 'utility',
  rental = 'rental',
  legal = 'legal',
  bank = 'bank',
  advertising = 'advertising',
  other = 'other',
}

export enum ExpenseStatus {
  pending = 'pending',
  approved = 'approved',
  canceled = 'canceled',
}

export type ExpenseFile = {
  id: UUID
  filename: string
}

export type UploadExpenseFile = {
  files: File[]
  expenseId: UUID
}
