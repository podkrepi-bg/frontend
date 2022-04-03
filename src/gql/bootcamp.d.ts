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
  startDate: Date | string | undefined
  endDate: Date | string | undefined
  firstName: string
  lastName: string
}

export type BootcampFormData = {
  status: string
  title: string
  email: string
  message: string
  startDate: Date | null | string | undefined
  endDate: Date | null | string | undefined
  firstName: string
  lastName: string
}

export type BootcampInput = {
  status: string | undefined
  title: string | undefined
  email: string | undefined
  message: string | undefined
  startDate: Date | string | undefined
  endDate: Date | string | undefined
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
