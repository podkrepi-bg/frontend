export type CampaignType = {
  id: UUID
  name: string
  slug: string
  parentId: UUID
  description: string
}

export enum CampaignState {
  initial,
  draft,
  pendingvalidation,
  approved,
  rejected,
  active,
  activependingvalidation,
  suspended,
  complete,
  disabled,
  error,
}

export type CampaignResponse = {
  id: UUID
  state: CampaignState
  slug: string
  title: string
  essence: string
  coordinatorId: UUID
  beneficiaryId: UUID
  campaignTypeId: UUID
  description: string
  targetAmount: number
  summary: { reachedAmount: number }[]
  currency: string
  startDate: Date | null
  endDate: Date | null
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type CampaignFormData = {
  title: string
  campaignTypeId: string
  beneficiaryId: string
  coordinatorId: string
  targetAmount: number
  startDate: Date | string | undefined
  endDate: Date | string | undefined
  description: string
}

export type CampaignInput = {
  title: string
  slug: string
  description: string
  essence: string
  campaignTypeId: UUID
  beneficiaryId: UUID
  coordinatorId: UUID
  targetAmount: number
  currency: string
  startDate: Date | string | undefined
  endDate: Date | string | undefined
}
