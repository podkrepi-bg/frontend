import { LegalEntityType, PersonRelation } from '../components/beneficiary/BeneficiaryTypes'

export type BeneficiaryType = {
  id: string
  type: LegalEntityType
  personId?: string
  companyId?: string
  /// Coordinator for this beneficiary
  coordinatorId: string
  countryCode: string
  cityId: string
  description: string
  publicData?: string
  privateData?: string
  campaigns: []
  coordinatorRelation: PersonRelation
}

export type BeneficiaryFormData = {
  type: LegalEntityType
  personId?: string
  companyId?: string
  /// Coordinator for this beneficiary
  coordinatorId: string
  countryCode: string
  cityId: string
  description: string
  publicData?: string
  privateData?: string
  campaigns: []
  coordinatorRelation: PersonRelation
}

export type DeleteMany = {
  ids: string[]
}

export type BeneficiaryResponse = {
  id: UUID
  person: Person
  personId: UUID
}
