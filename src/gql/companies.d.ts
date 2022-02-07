import { BeneficiaryType } from './beneficiaries'

export type CompanyResponse = {
  id: UUID
  companyName: string
  companyNumber: string
  legalPersonName?: string
  countryCode?: string
  cityId?: string
  createdAt: Date
  updatedAt?: Date
  beneficiaries: BeneficiaryType[]
}

export type CompanyInput = {
  id?: UUID
  companyName: string
  companyNumber: string
  legalPersonName?: string
  countryCode?: string
  cityId?: string
}

export type CompanyFormData = {
  companyName: string
  companyNumber: string
  legalPersonName?: string
  countryCode?: string
  cityId?: string
}
