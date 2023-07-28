import { AxiosResponse } from 'axios'
import { CampaignSubscribeInput, CampaignSubscribeResponse } from 'gql/campaigns'
import { useSession } from 'next-auth/react'
import { apiClient } from './apiClient'
import { endpoints } from './apiEndpoints'
import { authConfig } from './restRequests'
import {
  SendConfirmationEmailInput,
  SendConfirmationEmailResponse,
  SubscribePublicEmailInput,
  SubscribePublicEmailResponse,
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
