import { BeneficiaryType } from './beneficiaries'

export type CompanyResponse = {
  id: UUID
  companyName: string
  companyNumber: string
  legalPersonName: string | null
  countryCode: string | null
  cityId: string | null
  createdAt: Date
  updatedAt: Date | null
  beneficiaries: BeneficiaryType[]
}

export type CompanyInput = {
  id?: UUID
  companyName: string
  companyNumber: string
  legalPersonName: string | null
  countryCode: string | null
  cityId: string | null
}

export type CompanyFormData = {
  companyName: string
  companyNumber: string
  legalPersonName: string | undefined
  countryCode: string | undefined
  cityId: string | undefined
}
