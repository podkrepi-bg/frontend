export enum AccountType {
  INDIVIDUAL = 'individual',
  CORPORATE = 'corporate',
}

export type IndividualRegisterFormData = {
  type: AccountType
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
  gdpr: boolean
  newsletter?: boolean
  helpUsImprove?: boolean
}

export type CorporateRegisterFormData = IndividualRegisterFormData & {
  companyName: string
  companyNumber: string
}
