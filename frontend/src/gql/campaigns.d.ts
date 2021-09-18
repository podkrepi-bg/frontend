export type CampaignType = {
  id: UUID
  name: string
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

export type Campaign = {
  id: UUID
  state: CampaignState
  slug: string
  title: string
  excerpt: string
  coordinatorId: UUID
  beneficiaryId: UUID
  campaignTypeId: UUID
  description: string
  targetAmount: string
  currency: string
  startDate: Date | null
  endDate: Date | null
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}
