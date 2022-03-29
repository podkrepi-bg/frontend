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
  name: string
  postalCode: string
  countryId: string
}

export type CityFormData = {
  name?: string
  postalCode?: string
  countryId?: string
}

export type CityInput = {
  name?: string
  postalCode?: string
  countryId?: string
}

type EditCityProp = {
  id: string
  data: CityInput
}

type CityFormProps = {
  initialValues?: CityInput
  id?: string
}
