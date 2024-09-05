export type Step = {
  title: string
}

export enum Steps {
  NONE = -1,
  ORGANIZER = 0,
  CAMPAIGN = 1,
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

export type CampaignApplication = {
  beneficiaryNames: string
  title: string
  campaignType: string
  funds: number
  campaignEnd: string
}

export type CampaignApplicationFormData = {
  organizer: CampaignApplicationOrganizer
  application: CampaignApplication
  details: {
    organizerBeneficiaryRelationship: string
    campaignGuarantee: string | undefined
    otherFinancialSources: string | undefined
    description: string
    currentStatus: string
    cause: string
    links: string[]
    documents: string[]
  }
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
