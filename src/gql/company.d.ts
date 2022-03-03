export type CompanyResponse = {
  id: string
  companyName: string
  companyNumber: string
  legalPersonName: string | null
  countryCode: string | null
  cityId: string | null
  createdAt: Date
  updatedAt: Date | null
  beneficiaries?: Beneficiary[]
}
