import { UUID } from './types'

export type PersonResponse = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  company: string
  createdAt: string
  newsletter: boolean
  emailConfirmed: boolean
}

export type PersonFormData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  legalEntity: boolean
  companyName?: string
  companyNumber?: string
  legalPersonName?: string
  address?: string
}

export type CreateBeneficiaryInput = {
  firstName: string
  lastName: string
  email: string
  phone?: string
}

export type Person = {
  id: UUID
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  createdAt: Date
  updatedAt: Date
  newsletter: boolean
  address: string
  birthday: Date | null
  emailConfirmed: boolean
  personalNumber: string | null
  keycloakId: string | null
  stripeCustomerId: string | null
}

export type UpdatePerson = Partial<
  Pick<
    Person,
    | 'id'
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'phone'
    | 'company'
    | 'newsletter'
    | 'address'
    | 'birthday'
    | 'personalNumber'
  >
>

export type UpdateUserAccount = {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthday: Date | string
  password: string
}

export type AdminPersonFormData = Pick<PersonFormData, 'firstName' | 'lastName' | 'email' | 'phone'>

export type AdminPersonResponse = Pick<
  PersonResponse,
  'id' | 'firstName' | 'lastName' | 'email' | 'phone'
>

export type AdminCompanyFormData = Pick<
  PersonFormData,
  'companyName' | 'companyNumber' | 'address' | 'legalPersonName'
> & {
  countryId: string
  cityId: string
}

export type AdminCompanyResponse = Pick<
  PersonFormData,
  'companyName' | 'companyNumber' | 'address' | 'legalPersonName'
> & {
  countryId: string
  cityId: string
}
