import { SendNewsLetterConsent } from 'gql/marketing'
import { SendConfirmationEmailInput } from 'gql/notification'
import { useSession } from 'next-auth/react'
import { authConfig } from './restRequests'
import { endpoints } from './apiEndpoints'
import { apiClient } from './apiClient'
import { AxiosResponse } from 'axios'

export function useSendConsentEmail() {
  const { data: session } = useSession()
  return async (data: SendNewsLetterConsent) => {
    return await apiClient.post<SendNewsLetterConsent, AxiosResponse<SendConfirmationEmailInput>>(
      endpoints.notifications.sendNewsLetterConsentEmail.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}
