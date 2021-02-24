type RoleTypes = 'benefactor' | 'partner' | 'volunteer' | 'associationMember' | 'promoter'

export type Step = {
  label: string
  component: JSX.Element
}

export enum Steps {
  NONE = -1,
  ROLES = 0,
  QUESTIONS = 1,
  INFO = 2,
  NEWSLETTER = 3,
}

export type Info = {
  email: string
  name: string
  phone: string
  address: string
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
  terms: boolean
  newsletter: boolean
  info: Info
  roles: Roles
  benefactor?: Benefactor
  partner?: Partner
  volunteer?: Volunteer
  associationMember?: Member
  promoter?: Promoter
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
  key: string
  title: string
  errorMessage: string
  showError: boolean
  options: Option[]
}
