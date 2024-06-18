export type SendMarketingEmail = {
  templateId: string
  listId: string
}

export type SendNewsLetterConsent = SendMarketingEmail & {
  dateThreshold?: string
}
