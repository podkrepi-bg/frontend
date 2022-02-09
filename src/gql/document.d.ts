export type DocumentType = {
  id: string
  type: DocumentType
  name: string
  filename: string
  filetype?: string
  description?: string
  sourceUrl: string
  ownerId: string
}

export type DocumentInput = {
  type?: DocumentType | ''
  name?: string
  filename?: string
  filetype?: string
  description?: string
  sourceUrl?: string
}

enum DocumentType {
  'invoice',
  'receipt',
  'medical_record',
  'other',
}
