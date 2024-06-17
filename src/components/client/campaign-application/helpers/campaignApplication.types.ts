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

export type CampaignApplicationFormData = {}
