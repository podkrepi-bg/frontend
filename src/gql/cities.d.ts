export enum CityState {
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

export type CityResponse = {
  id: UUID
  // state: cityState
  firstName: string
  lastName: string
}

export type CityFormData = {
  firstName: string
  lastName: string
}

export type CityInput = {
  firstName: string
  lastName: string
}

type EditCityProp = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: string
  data: CityInput
}
