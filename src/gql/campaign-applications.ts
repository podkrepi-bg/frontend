export interface CreateCampaignApplicationInput {
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

  campaignEnd: string

  campaignTypeId?: string
}

export type CreateCampaignApplicationResponse = CreateCampaignApplicationInput & {
  id: string
}

export interface UploadCampaignApplicationFilesRequest {
  campaignApplicationId: string
  files: File[]
}

export type UploadCampaignApplicationFilesResponse = {
  id: string
  filename: string
}

export type CampaignApplicationExisting = CreateCampaignApplicationResponse & {
  documents: Array<{
    id: string
    filename: string
  }>
}
