import { UUID } from './types'

export type CityResponse = {
  id: UUID
  name: string
  postalCode: number
  countriId: UUID
}
