export type SendConfirmationEmailInput = {
  email: string
}

export type SendConfirmationEmailResponse = {
  message: string
}

export type SubscribePublicEmailInput = {
  email: string
  consent: boolean
  hash: string
  campaignId?: string | null
}

export type SubscribePublicEmailResponse = {
  email: string
  subscribed: boolean
}
