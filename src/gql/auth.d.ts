export type LoginResponse = {
  error?: string
  data: {
    error?: string
    error_description?: string
    jwt?: string
  }
}

export type LoginFormData = {
  email: string
  password?: string
}

export type RegisterResponse = {
  error?: string
  data: {
    error?: string
    error_description?: string
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
}

export type RegisterFormData = {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}
