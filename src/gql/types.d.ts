export type UUID = string

export type PaginationData = {
  pageIndex: number
  pageSize: number
}

export type SortData = {
  sortBy: string
  sortOrder: string
}

export type FilterData = {
  status: PaymentStatus
  paymentProvider: PaymentProvider
  date: { from: Date | null; to: Date | null }
  minAmount: number
  maxAmount: number
  sortBy: string
}
