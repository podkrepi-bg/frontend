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

export enum IrregularityStatus {
  INITIAL = 'initial',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined',
}

export enum IrregularityReason {
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
  phone: string | undefined
}

export type InfoFormData = {
  notifierType: NotifierTypes
  description: string
  campaignId: string
  reason: IrregularityReason
}

export type IrregularityFormData = {
  status: IrregularityStatus
  person: PersonFormData
  info: InfoFormData
}

export type IrregularityFormDataSteps = {
  [Steps.NONE]: never
  [Steps.GREETING]: never
  [Steps.CONTACTS]: {
    status: IrregularityStatus
    person: PersonFormData
  }
  [Steps.INFO]: {
    info: InfoFormData
  }
}

export type IrregularityInput = {
  campaignId: UUID
  person: PersonFormData
  notifierType: NotifierTypes
  status: IrregularityStatus
  reason: IrregularityReason
  description: string | undefined
}

export type IrregularityEditInput = {
  campaignId: UUID
  personId: UUID
  person: PersonFormData
  notifierType: NotifierTypes
  status: IrregularityStatus
  reason: IrregularityReason
  description: string | undefined
}

export type IrregularityResponse = {
  id: UUID
  campaignId: UUID
  personId: UUID
  notifierType: NotifierTypes
  createdAt: Date
  updatedAt: Date | undefined
  status: IrregularityStatus
  reason: IrregularityReason
  description: string | undefined
  campaign: CampaignResponse
  person: PersonResponse
  irregularityFiles: IrregularityFileResponse[]
}

export type IrregularityFileResponse = {
  id: UUID
  filename: string
  mimetype: string
  irregularityId: UUID
  uploadedById: UUID
}

export type UploadIrregularityFiles = {
  irregularityId: UUID
  files: File[]
}

export type IrregularityUploadImage = {
  title: string
}
