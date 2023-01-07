export type UUID = string

export type PaginationData = {
  pageIndex: number
  pageSize: number
}

export type FilterData = {
  status: DonationStatus
  type: DonationType
  date: { from: Date | null; to: Date | null }
}
