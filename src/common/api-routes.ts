export type ApiError = {
  field: string
  message: string
  validator: string
  customMessage: boolean
}
export type ApiErrors = {
  error?: string
  validation?: ApiError[]
}
