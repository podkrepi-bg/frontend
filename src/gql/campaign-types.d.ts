import { UUID } from './types'

export type CampaignTypesType = {
  id: UUID
  name: string
  slug: string
  description: string | null
  parentId: string | null
}
export type CampaignTypesResponse = {
  id: UUID
  name: string
  slug: string
  description: string | null
  parentId: string | null
}

export type CampaignTypesInput = {
  name: string
  slug: string
  description: string | null
  parentId: string | null
}

export type CampaignFormData = {
  name: string
  slug: string
  description: string | null
  parentId: string | null
}
