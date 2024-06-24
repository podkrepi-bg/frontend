import { Person } from 'gql/person'

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

export type CampaignApplicationOrganizer = Pick<
  Person,
  'firstName' | 'lastName' | 'phone' | 'email'
>

export type CampaignApplicationFormData = {
  organizer: CampaignApplicationOrganizer
}

export type CampaignApplicationFormDataSteps = {
  [Steps.NONE]: never
  [Steps.ORGANIZER]: {
    organizer: CampaignApplicationOrganizer
  }
}
