import { CampaignTypeCategory } from 'components/common/campaign-types/categories'

export type CampaignApplicationState =
  | 'review'
  | 'requestInfo'
  | 'forCommitteeReview'
  | 'approved'
  | 'denied'
  | 'abandoned'

export interface CampaignApplication {
  id: string
  createdAt: Date
  updatedAt: Date | null
  organizerId: string | null
  organizerName: string
  organizerEmail: string | null
  organizerPhone: string | null
  beneficiary: string
  organizerBeneficiaryRel: string
  campaignName: string
  goal: string
  history: string | null
  amount: string
  description: string | null
  documents?: object[]
  campaignGuarantee: string | null
  otherFinanceSources: string | null
  otherNotes: string | null
  state: CampaignApplicationState
  category: CampaignTypeCategory | null
  ticketURL: string | null
  archived: boolean | null
}


export type Keys = keyof CampaignApplication;