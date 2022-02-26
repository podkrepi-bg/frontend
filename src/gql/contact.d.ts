export type ContactRequestResponse = {
  id: string
  personId: string
}

export type ContactFormData = {
  firstName: string
  lastName: string
  email: string
  company?: string
  phone?: string
  message: string
  terms: boolean
  gdpr: boolean
}

export type ContactRequestInput = {
  firstName: string
  lastName: string
  email: string
  company?: string
  phone?: string
  message: string
}
