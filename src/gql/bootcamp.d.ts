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
  startDate: Date | null | undefined
  endDate: Date | null | undefined
  firstName: string
  lastName: string
}

export type BootcampInput = {
  status: string | undefined
  title: string | undefined
  email: string | undefined
  message: string | undefined
  startDate: Date | null
  endDate: Date | null
  firstName: string | undefined
  lastName: string | undefined
}

export type DeleteMany = {
  ids: string[]
}

type EditBootcampProp = {
  id: string
  data: BootcampInput
}

type BootcampFormProps = {
  initialValues?: BootcampInput
  id?: string
}
