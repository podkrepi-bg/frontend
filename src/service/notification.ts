import { AxiosResponse } from 'axios'
import { CampaignSubscribeInput, CampaignSubscribeResponse } from 'gql/campaigns'
import { useSession } from 'next-auth/react'
import { apiClient } from './apiClient'
import { endpoints } from './apiEndpoints'
import { authConfig } from './restRequests'
import {
  SendConfirmationEmailInput,
  SendConfirmationEmailResponse,
  SubscribeEmailInput,
  SubscribeEmailResponse,
  SubscribePublicEmailInput,
  SubscribePublicEmailResponse,
  UNsubscribeEmailInput,
  UNsubscribeEmailResponse,
  UNsubscribePublicEmailInput,
  UNsubscribePublicEmailResponse,
} from 'gql/notification'

export function useSubscribeToCampaign(id: string) {
  const { data: session } = useSession()
  return async (data: CampaignSubscribeInput) => {
    return await apiClient.post<
      CampaignSubscribeResponse,
      AxiosResponse<CampaignSubscribeResponse>
    >(endpoints.campaign.subscribeToCampaign(id).url, data, authConfig(session?.accessToken))
  }
}

export function useSendConfirmationEmail() {
  return async (data: SendConfirmationEmailInput) => {
    return await apiClient.post<
      SendConfirmationEmailResponse,
      AxiosResponse<SendConfirmationEmailResponse>
    >(endpoints.notifications.sendConfirmationEmail.url, data)
  }
}

export function useSubscribePublicEmail() {
  return async (data: SubscribePublicEmailInput) => {
    return await apiClient.post<
      SubscribePublicEmailResponse,
      AxiosResponse<SubscribePublicEmailResponse>
    >(endpoints.notifications.subscribePublicEmail.url, data)
  }
}

export function useUNSubscribePublicEmail() {
  return async (data: UNsubscribePublicEmailInput) => {
    return await apiClient.post<
      UNsubscribePublicEmailResponse,
      AxiosResponse<UNsubscribePublicEmailResponse>
    >(endpoints.notifications.unsubscribePublicEmail.url, data)
  }
}

export function useSubscribeEmail() {
  const { data: session } = useSession()
  return async (data: SubscribeEmailInput) => {
    return await apiClient.post<SubscribeEmailResponse, AxiosResponse<SubscribeEmailResponse>>(
      endpoints.notifications.subscribeEmail.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useUNsubscribeEmail() {
  const { data: session } = useSession()
  return async (data: UNsubscribeEmailInput) => {
    return await apiClient.post<UNsubscribeEmailResponse, AxiosResponse<UNsubscribeEmailResponse>>(
      endpoints.notifications.unsubscribeEmail.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}
