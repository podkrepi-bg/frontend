export type ExpenseType = {
  id: UUID
  type: ExpenseTypeEnum
  status: ExpenseStatus
  currency: Currency
  amount: number
  description?: string
}

export enum ExpenseStatus {
  pending,
  approved,
  canceled,
}

export enum ExpenseTypeEnum {
  none,
  internal,
  operating,
  administrative,
  medical,
  services,
  groceries,
  transport,
  accommodation,
  shipping,
  utility,
  rental,
  legal,
  bank,
  advertising,
  other,
}

export type ExpenseResponse = {
  id: UUID
  type: ExpenseType
  status: ExpenseStatus
  amount: number
  approvedById?: UUID | null
  deleted: boolean
  description?: string
  documentId: UUID | null
  vaultId: string
}

export type ExpenseFormData = {
  type: ExpenseType
  currency: Currency
  amount: number
  description?: string
}

export type ExpenseFormInput = {
  type: ExpenseType
  currency: Currency
  amount: number
  description?: string
}
