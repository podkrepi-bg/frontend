export const PersonRelation = {
  none: 'none',
  myself: 'myself',
  myorg: 'myorg',
  parent: 'parent',
  spouse: 'spouse',
  child: 'child',
  mother: 'mother',
  father: 'father',
  brother: 'brother',
  sister: 'sister',
  friend: 'friend',
  relative: 'relative',
  partner: 'partner',
  domesticPartner: 'domesticPartner',
  manager: 'manager',
  assistant: 'assistant',
  colleague: 'colleague',
}

export type BeneficiaryType = {
  id: string
  type: 'individual' | 'company'
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
  type: 'individual' | 'company'
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
