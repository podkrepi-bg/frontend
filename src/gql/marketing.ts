export type SendMarketingEmail = {
  templateId: string
  listId: string
  subject: string
}

export type SendNewsLetterConsent = SendMarketingEmail & {
  dateThreshold?: string
}

export type NewsLetterConsentResponse = {
  contactCount: number
}
