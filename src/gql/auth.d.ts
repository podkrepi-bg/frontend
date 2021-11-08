export type LoginResponse = any

export type LoginFormData = {
  email: string
  password?: string
  csrfToken?: string
}

export type RegisterResponse = {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  emailConfirmed?: boolean
  phone?: string
  company?: string
  createdAt?: string
  updatedAt?: string
  newsletter?: boolean
  address?: string
  birthday?: string
  personalNumber?: string
  keycloakId?: string
}

export type RegisterFormData = {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  csrfToken?: string
}
