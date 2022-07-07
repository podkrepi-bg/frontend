import { UUID } from './types'
import { Person } from './person'
import { CampaignResponse } from './campaigns'

export type OrganizerResponse = {
  id: UUID
  personId: UUID
  createdAt: Date
  person: Person
  campaigns: Pick<CampaignResponse, 'id' | 'slug'>[]
}

export type OrganizerInput = {
  personId: string
}
