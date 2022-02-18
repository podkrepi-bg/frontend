export type BeneficiaryType = {
  id: string
  type: string
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
}

export type BeneficiaryFormData = {
  type: string
  personId?: string
  companyId?: string
  /// Coordinator for this beneficiary
  coordinatorId: string
  countryCode: string
  cityId: string
  description: string
  publicData?: string
  privateData?: string
  campaigns: Record<string, never>
}
