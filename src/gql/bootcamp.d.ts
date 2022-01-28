import { UUID } from './types'

export type BootcampStudentResponse = {
  id: UUID
  firstName: string
  lastName: string
}

export type BootcampStudentInput = {
  firstName: string
  lastName: string
  id?: UUID
}

export type AnimalResponse = {
  id: UUID
  name: string
  type: string
}

export type AnimalInput = {
  id?: UUID
  name: string
  type: string
}
