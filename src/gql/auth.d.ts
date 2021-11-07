export type LoginResponse = any

export type LoginFormData = {
  email: string
  password?: string
  csrfToken?: string
}

export type RegisterResponse = any
export type RegisterFormData = {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  csrfToken?: string
}
