import { UUID } from './types'
export interface BootcampSimeonResponse {
  id: UUID
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
}

export interface BootcampSimeonInput {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
}
