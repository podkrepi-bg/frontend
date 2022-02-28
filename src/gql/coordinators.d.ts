import { UUID } from './types'
import { Person } from './person'
export type CoordinatorResponse = {
  id: UUID
  person: Person
}

export type CoorinatorInput = {
  personId: string
}
