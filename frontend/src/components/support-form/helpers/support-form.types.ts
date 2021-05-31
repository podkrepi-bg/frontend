type RoleTypes = 'benefactor' | 'partner' | 'volunteer' | 'associationMember' | 'promoter'

export type Step = {
  label: string
  component: JSX.Element
}

export enum Steps {
  NONE = -1,
  ROLES = 0,
  QUESTIONS = 1,
  PERSON = 2,
  NEWSLETTER = 3,
  FINISH = 4,
}

export type Person = {
  email: string
  name: string
  phone: string
  address: string
  terms: boolean
  gdpr: boolean
}
export type Benefactor = {
  campaignBenefactor?: boolean
  platformBenefactor?: boolean
}
export type Partner = {
  npo?: boolean
  bussiness?: boolean
  other?: boolean
  otherText?: string
}
export type Volunteer = {
  backend?: boolean
  frontend?: boolean
  marketing?: boolean
  qa?: boolean
  designer?: boolean
  projectManager?: boolean
  devOps?: boolean
  security?: boolean
  financesAndAccounts?: boolean
  lawyer?: boolean
}
export type Member = {
  isMember?: boolean
}
export type Promoter = {
  mediaPartner?: boolean
  ambassador?: boolean
  other?: boolean
  otherText?: string
}
export type Roles = { [key in RoleTypes]: boolean }
export type SupportFormData = {
  newsletter: boolean
  person: Person
  roles: Roles
  benefactor?: Benefactor
  partner?: Partner
  volunteer?: Volunteer
  associationMember?: Member
  promoter?: Promoter
}
export type SupportFormDataSteps = {
  [Steps.NONE]: never
  [Steps.ROLES]: {
    roles: Roles
  }
  [Steps.QUESTIONS]: {
    benefactor?: Benefactor
    partner?: Partner
    volunteer?: Volunteer
    associationMember?: Member
    promoter?: Promoter
  }
  [Steps.PERSON]: {
    person: Person
  }
  [Steps.NEWSLETTER]: {
    newsletter: boolean
  }
}

export interface TextFieldOptions {
  value: string
  name: string
  placeholder: string
}

export interface Option {
  type: string
  value: string | string[] | boolean | undefined
  name: string
  label: string
  textFieldOptions?: TextFieldOptions
}

export interface RoleRenderObject {
  key: RoleTypes
  title: string
  errorMessage: string
  options: Option[]
}
