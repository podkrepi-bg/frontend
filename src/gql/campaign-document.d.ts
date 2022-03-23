import { UUID } from './types'

export type campaignDocumentInput = {
  name: string
  description: string
}

export type campaignDocumentResponse = {
  id: UUID
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type DeleteMany = {
  ids: string[]
}
