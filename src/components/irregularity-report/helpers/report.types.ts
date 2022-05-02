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

export enum DonorTypes {
  No = 'no',
  Yes = 'yes',
}

export type PersonFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type InfoFormData = {
  donorType: DonorTypes | string
  description: string
  campaignId: string
}

export type ReportFormData = {
  person: PersonFormData
  info: InfoFormData
}

export type ReportFormDataSteps = {
  [Steps.NONE]: never
  [Steps.GREETING]: never
  [Steps.CONTACTS]: {
    person: PersonFormData
  }
  [Steps.INFO]: {
    info: InfoFormData
  }
}
