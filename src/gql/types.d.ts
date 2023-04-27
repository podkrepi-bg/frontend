import React from 'react'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'

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

export type CategoryType = {
  text: string
  type: CampaignTypeCategory
  count?: number
  isDisabled?: boolean
  icon: React.ReactElement
}
