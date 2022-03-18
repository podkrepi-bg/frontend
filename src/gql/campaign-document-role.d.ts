import { UUID } from './types'

export type campaignDocumentRoleInput = {
  name: string
  description: string
}

export type campaignDocumentRoleResponse = {
  id: UUID
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type DeleteMany = {
  ids: string[]
}
