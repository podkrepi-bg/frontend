import { Campaign } from './recurring-donation'

export type NotificationList = {
  id: string
  campaignId: string
  campaign: Campaign
}

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
  message: string
}

export type UNsubscribePublicEmailInput = {
  email: string
  campaignId?: string | null
}

export type UNsubscribePublicEmailResponse = {
  message: string
}

export type SubscribeEmailInput = {
  consent: boolean
}

export type SubscribeEmailResponse = {
  message: string
}

export type UNsubscribeEmailInput = {
  campaignId?: string
}

export type UNsubscribeEmailResponse = {
  message: string
}

export type GetCampaignNotificationSubscriptionsResponse = NotificationList[]
