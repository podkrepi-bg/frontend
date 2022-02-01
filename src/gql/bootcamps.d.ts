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
  // state: BootcampState
  firstName: string
  lastName: string
}

export type BootcampFormData = {
  firstName: string
  lastName: string
}

export type BootcampInput = {
  firstName: string
  lastName: string
}

type EditBootcampProp = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: any
  data: BootcampInput
}
