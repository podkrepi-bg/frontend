export type UUID = string

export type PaginationData = {
  pageIndex: number
  pageSize: number
}

export type FilterData = {
  status: DonationStatus
  paymentProvider: PaymentProvider
  date: { from: Date | null; to: Date | null }
  minAmount: number
  maxAmount: number
  sortBy: string
}
