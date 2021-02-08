export type LoginForm = {
  email: string
  password: string
}
export type RegisterForm = {
  firstName: string
  lastName: string
  email: string
  password: string
}
export type ForgottenPasswordForm = {
  email: string
}
export type ChangePasswordForm = {
  password: string
  confirmPassword: string
}

export enum ValidationSchema {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOTTEN_PASSWORD = 'forgotten-password',
  CHANGE_PASSWORD = 'change-password',
}
