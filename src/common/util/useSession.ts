export type Session = {
  user?: {
    name: string
    email: string
    image: string
  }
}

export type ParsedToken = {
  name?: string
  email?: string
  given_name?: string
  family_name?: string
  preferred_username?: string
  email_verified?: boolean
  picture?: string
}
