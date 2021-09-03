export type CampaignType = {
  id: UUID
  name: string
}

export type Campaign = {
  id: UUID
  title: string
  state: string
  currency: string
  shortDescription: string
  operatorId: UUID
  initiatorId: UUID
  beneficiaryId: UUID
  campaignType: CampaignType
}
