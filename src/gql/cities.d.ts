import { UUID } from './types'

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
  name: string
  postalCode: number
}

export type CityFormData = {
  name: string
  postalCode: number
}

export type CityInput = {
  name: string
  postalCode: number
  countryId: string
}

type EditCityProp = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: UUID
  data: CityInput
}
