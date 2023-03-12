import { BeneficiaryType, PersonRelation } from '../components/admin/beneficiary/BeneficiaryTypes'
import { Person } from './person'

export type BeneficiaryListResponse = {
  id: string
  type?: BeneficiaryType
  personId?: string
  person?: Person
  company?: { companyName: string }
  companyId?: string
  countryCode: string
  cityId: string
  description: string
  publicData?: string
  privateData?: string
  campaigns: []
  organizerRelation?: PersonRelation
}

export type ViewBeneficiaryResponse = BeneficiaryListResponse & {
  city: { name: string }
  company?: { companyName: string }
}

export type BeneficiaryFormData = {
  type?: BeneficiaryType
  personId?: string
  companyId?: string
  countryCode: string
  cityId: string
  description?: string
  publicData?: string
  privateData?: string
  campaigns: []
  organizerRelation?: PersonRelation
}
