import { BeneficiaryType, PersonRelation } from '../components/beneficiary/BeneficiaryTypes'
import { Person } from './person'

export type BeneficiaryListResponse = {
  id: string
  type: BeneficiaryType
  personId?: string
  person?: Person
  company?: { companyName: string }
  companyId?: string
  /// Coordinator for this beneficiary
  coordinatorId?: string
  /// Organizer for this beneficiary
  organizerId?: string
  countryCode: string
  cityId: string
  description: string
  publicData?: string
  privateData?: string
  campaigns: []
  coordinatorRelation?: PersonRelation
  organizerRelation?: PersonRelation
}

export type ViewBeneficiaryResponse = BeneficiaryListResponse & {
  city: { name: string }
  coordinator?: { person: Person }
  organizer?: { person: Person }
  company?: { companyName: string }
}

export type BeneficiaryFormData = {
  type: BeneficiaryType
  personId?: string
  companyId?: string
  /// Coordinator for this beneficiary
  coordinatorId?: string
  /// Organizer for this beneficiary
  organizerId?: string
  countryCode: string
  cityId: string
  description: string
  publicData?: string
  privateData?: string
  campaigns: []
  coordinatorRelation?: PersonRelation
  organizerRelation?: PersonRelation
}
