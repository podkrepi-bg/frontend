import { CampaignTypeCategory } from 'components/campaign-types/categories'
import { UUID } from './types'

export type CampaignTypesType = {
  id: UUID
  category: CampaignTypeCategory
  name: string
  slug?: string
  description: string | null
  parentId: string | null
}
export type CampaignTypesResponse = {
  id: UUID
  category: CampaignTypeCategory
  name: string
  slug?: string
  description: string | null
  parentId: string | null
}

export type CampaignTypesInput = {
  name: string
  slug?: string
  description: string | null
  parentId: string | null
}

export type CampaignTypeFormData = {
  name: string
  category: string
  slug?: string
  description: string | null
  parentId?: string | null
}

export type DeleteMany = {
  ids: string[]
}
