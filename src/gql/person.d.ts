export type PersonResponse = {
  id: string
  personId: string
  firstName: string
  lastName: string
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
