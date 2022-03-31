import { UUID } from './types'

export enum BootcampState {
  initial,
  draft,
  pendingvalidation,
  approved,
  rejected,
  active,
  activependingvalidation,
  suspended,
  complete,
  disabled,
  error,
}

export type BootcampResponse = {
  id: UUID
  status: string
  title: string
  email: string
  message: string
  startDate: Date | null
  endDate: Date | null
  firstName: string
  lastName: string
}

export type BootcampFormData = {
  status: string
  title: string
  email: string
  message: string
  startDate: Date | null
  endDate: Date | null
  firstName: string
  lastName: string
}

export type BootcampInput = {
  status: string
  title: string
  email: string
  message: string
  startDate: Date | null
  endDate: Date | null
  firstName: string
  lastName: string
}

export type DeleteMany = {
  ids: string[]
}
