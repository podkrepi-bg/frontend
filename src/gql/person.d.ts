export type PersonResponse = {
  id: string
  personId: string
}

export type PersonFormData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  adress?: string
}

export type CreateBeneficiaryInput = {
  firstName: string
  lastName: string
  email: string
  phone?: string
}
