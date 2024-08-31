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
=======
export class CreateCampaignApplicationInput {
  /**
   * What would the campaign be called. ('Help Vesko' or 'Castrate Plovdiv Cats')
   */
  campaignName: string

  /** user needs to agree to this as a prerequisite to creating a campaign application */
  acceptTermsAndConditions: boolean

  /** user needs to agree to this as a prerequisite to creating a campaign application */
  transparencyTermsAccepted: boolean

  /** user needs to agree to this as a prerequisite to creating a campaign application */
  personalInformationProcessingAccepted: boolean

  /** Who is organizing this campaign */
  organizerName: string

  /** Contact Email to use for the Campaign Application process i.e. if more documents or other info are requested */
  organizerEmail: string

  /** Contact Email to use for the Campaign Application process i.e. if more documents or other info are requested */
  organizerPhone: string

  /** Who will benefit and use the collected donations */
  beneficiary: string

  /** What is the relationship between the Organizer and the Beneficiary ('They're my elderly relative and I'm helping with the internet-computer stuff') */
  organizerBeneficiaryRel: string

  /** What is the result that the collected donations will help achieve */
  goal: string

  /** What if anything has been done so far */
  history?: string

  /** How much would the campaign be looking for i.e '10000lv or 5000 Eur or $5000' */
  amount: string

  /** Describe the goal of the campaign in more details */
  description?: string

  /** Describe public figures that will back the campaign and help popularize it. */
  campaignGuarantee?: string

  /** If any - describe what other sources were used to gather funds for the goal */
  otherFinanceSources?: string

  /** Anything that the operator needs to know about the campaign */
  otherNotes?: string

  category?: CampaignTypeCategory
}

export type CreateCampaignApplicationResponse = CreateCampaignApplicationInput & {
  id: string
}
