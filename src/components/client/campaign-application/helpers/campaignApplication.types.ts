export type Step = {
  title: string
}

export enum Steps {
  NONE = -1,
  ORGANIZER = 0,
  CAMPAIGN_BASIC = 1,
  CAMPAIGN_DETAILS = 2,
  CREATED_DETAILS = 3,
}

export type CampaignApplicationOrganizer = {
  name: string
  phone: string
  email: string
  acceptTermsAndConditions: boolean
  transparencyTermsAccepted: boolean
  personalInformationProcessingAccepted: boolean
}

export type CampaignApplicationBasic = {
  beneficiaryNames: string
  title: string
  campaignType: string
  funds: number
  campaignEnd: string
}

export type CampaignApplicationDetails = {
  cause: string
  organizerBeneficiaryRelationship?: string
  campaignGuarantee?: string
  otherFinancialSources?: string
  description?: string
  currentStatus?: string
  links?: string[]
}

export type CampaignApplicationFormData = {
  organizer: CampaignApplicationOrganizer
  applicationBasic: CampaignApplicationBasic
  applicationDetails: CampaignApplicationDetails
}

export type CampaignApplicationFormDataSteps = {
  [Steps.NONE]: never
  [Steps.ORGANIZER]: {
    organizer: CampaignApplicationOrganizer
  }
}

export enum CampaignEndTypes {
  FUNDS = 'funds',
  ONGOING = 'ongoing',
  DATE = 'date',
}
