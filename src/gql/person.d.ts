import { UUID } from './types'
import { BeneficiaryFormData } from './beneficiary'
import { CompanyResponse } from './company'

export type PersonResponse = {
  id: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  address: string
  createdAt: string
  newsletter: boolean
  emailConfirmed: boolean
  beneficiaries?: PersonBeneficiaryResponse[]
  coordinators?: PersonRoleResponse
  organizer?: PersonRoleResponse
  profileEnabled: boolean
  company: Pick<CompanyResponse, 'id' | 'companyName'>
}

export type PersonRoleResponse = {
  id: string
  _count?: {
    campaigns: number
  }
}

export type PersonBeneficiaryResponse = {
  id: string
  countryCode: string
  cityId: string
  description?: string
  organizerRelation?: PersonRelation
  _count?: {
    campaigns: number
  }
}

export type PersonPaginatedResponse = {
  items: PersonResponse[]
  total: number
}

export type PersonFormData = {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  legalEntity: boolean
  companyName?: string
  companyNumber?: string
  legalPersonName?: string
  address?: string
  isBeneficiary?: boolean
  isCoordinator?: boolean
  isOrganizer?: boolean
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
  createdAt: Date
  updatedAt: Date
  newsletter: boolean
  address: string
  birthday: Date | null
  emailConfirmed: boolean
  personalNumber: string | null
  keycloakId: string | null
  stripeCustomerId: string | null
  newsletter: boolean | null
  company: CompanyResponse
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

export type AdminPersonFormData = Pick<
  PersonFormData,
  'firstName' | 'lastName' | 'email' | 'phone' | 'isBeneficiary' | 'isCoordinator' | 'isOrganizer'
> &
  Pick<BeneficiaryFormData, 'countryCode' | 'cityId' | 'description' | 'organizerRelation'>

export type AdminPersonResponse = Pick<
  PersonResponse,
  'id' | 'firstName' | 'lastName' | 'email' | 'phone' | 'profileEnabled'
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
