import { Dispatch, SetStateAction } from 'react'

import { UUID } from './types'

export type BootcampInternResponse = {
  id?: UUID
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
}

export type BootcampInternInput = {
  id?: UUID
  firstName: string
  lastName: string
  email: string
}
