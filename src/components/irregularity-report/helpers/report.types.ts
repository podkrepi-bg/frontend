import { UUID } from 'gql/types'
import { PersonResponse } from 'gql/person'
import { CampaignResponse } from 'gql/campaigns'

export type Step = {
  component: JSX.Element
}

export enum Steps {
  NONE = -1,
  GREETING = 0,
  CONTACTS = 1,
  INFO = 2,
  FINISH = 3,
}

export enum NotifierTypes {
  BENEFACTOR = 'benefactor',
  OTHER = 'other',
}

export enum ReportStatus {
  INITIAL = 'initial',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined',
}

export enum ReportReason {
  NONE = 'none',
  DUPLICATE = 'duplicate',
  INAPPROPRIATE = 'inappropriate',
  ILLEGALACTIVITY = 'illegalActivity',
  MISINFORMATION = 'misinformation',
  PRIVACYVIOLATION = 'privacyViolation',
  SPAM = 'spam',
  IRRELEVANT = 'irrelevant',
  POLITICAL = 'political',
  DISCRIMINATION = 'discrimination',
  EXPLICITCONTENT = 'explicitContent',
  FRAUD = 'fraud',
  OTHER = 'other',
}

export type PersonFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type InfoFormData = {
  notifierType: NotifierTypes
  reportContent: string
  campaignId: string
  reason: ReportReason
}

export type CampaignReportFormData = {
  status: ReportStatus
  person: PersonFormData
  info: InfoFormData
}

export type ReportFormDataSteps = {
  [Steps.NONE]: never
  [Steps.GREETING]: never
  [Steps.CONTACTS]: {
    status: ReportStatus
    person: PersonFormData
  }
  [Steps.INFO]: {
    info: InfoFormData
  }
}

export type CampaignReportInput = {
  campaignId: UUID
  person: PersonFormData
  notifierType: NotifierTypes
  status: ReportStatus
  reason: ReportReason | string | undefined
  reportContent: string | undefined
}

export type CampaignReportResponse = {
  id: UUID
  campaignId: UUID
  personId: UUID
  notifierType: NotifierTypes
  createdAt: Date
  updatedAt: Date | undefined
  status: ReportStatus
  reason: ReportReason
  reportContent: string | undefined
  campaign: CampaignResponse
  person: PersonResponse
}
