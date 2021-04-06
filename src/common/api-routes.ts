export type ApiError = {
  field: string
  message: string
  validator: string
  customMessage: boolean
}
export type ApiErrors = {
  error?: ApiError
  errors?: ApiError[]
}
