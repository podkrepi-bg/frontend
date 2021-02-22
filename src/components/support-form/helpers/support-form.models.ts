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
  GDPR = 3,
}

export type SupportFormData = {
  terms: boolean
  info: {
    email: string
    name: string
    phone: string
    address: string
  }
  roles: { [key in RoleTypes]: boolean }
  benefactor:
    | {
        campaignBenefactor: boolean
        platformBenefactor: boolean
      }
    | any
  partner:
    | {
        npo: boolean
        bussiness: boolean
        other: boolean
        otherText: string
      }
    | any
  volunteer:
    | {
        areas: Array<string>
      }
    | any
  associationMember:
    | {
        isMember: boolean
      }
    | any
  promoter:
    | {
        mediaPartner: boolean
        ambassador: boolean
        other: boolean
        otherText: string
      }
    | any
}

export interface TextFieldOptions {
  value: string
  name: string
  placeholder: string
}

export interface DropdownOption {
  text: string
  value: string
}

export interface Option {
  type: string
  value: any
  name: string
  label: string
  textFieldOptions?: TextFieldOptions
  dropdownOptions?: DropdownOption[]
}

export interface RoleRenderObject {
  key: string
  title: string
  errorMessage: string
  formikErrors: any
  options: Option[]
}
