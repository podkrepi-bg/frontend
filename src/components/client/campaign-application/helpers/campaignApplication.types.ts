export type Step = {
  title: string
  component: JSX.Element
}

export enum Steps {
  NONE = -1,
  ORGANIZER = 0,
  CAMPAIGN = 1,
  CAMPAIGN_DETAILS = 2,
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
  campaignType: string
  funds: number
  campaignEnd: string
}

export type CampaignApplicationFormData = {
  organizer: CampaignApplicationOrganizer
  application: CampaignApplication
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
