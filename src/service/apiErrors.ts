import Axios from 'axios'

const { isAxiosError } = Axios
export { isAxiosError }

export interface ApiErrors {
  statusCode: number
  message: Message[]
  error: string
}

export interface Message {
  property: string
  children: Message[]
  constraints: Constraints
}

export interface Constraints {
  isEmail: string
  isString: string
  isNotEmpty: string
  [key: string]: string
}

export const matchValidator = (constraints: Constraints): string => {
  if ('isEmail' in constraints) {
    return 'validation:email'
  }

  if ('isNotEmpty' in constraints) {
    return 'validation:required'
  }

  return 'validation:invalid'
}
