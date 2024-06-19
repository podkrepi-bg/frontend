import { NewsLetterConsentResponse, SendNewsLetterConsent } from 'gql/marketing'
import { useSession } from 'next-auth/react'
import { authConfig } from './restRequests'
import { endpoints } from './apiEndpoints'
import { apiClient } from './apiClient'

export function useSendConsentEmail() {
  const { data: session } = useSession()
  return async (data: SendNewsLetterConsent) => {
    return await apiClient.post<NewsLetterConsentResponse>(
      endpoints.notifications.sendNewsLetterConsentEmail.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}
