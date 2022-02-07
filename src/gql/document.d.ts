export type DocumentType = {
  id: string
  type: DocumentType
  name: string
  filename: string
  filetype?: number
  description?: string
  sourceUrl: string
  ownerId: string
}

enum DocumentType {
  'invoice',
  'receipt',
  'medical_record',
  'other',
}
