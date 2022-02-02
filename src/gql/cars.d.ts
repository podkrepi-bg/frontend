export type CarDataType = {
  brand: string | undefined
  model: string | undefined
  year: number | undefined
  engine: string | undefined
  price: number | undefined
}

export type CarResponse = {
  id: UUID
  brand: string
  model: string
  year: number
  engine: string
  price: number
}
