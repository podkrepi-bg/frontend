import { useSession } from 'next-auth/react'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { RecurringDonationInput, RecurringDonationResponse } from 'gql/recurring-donation'

export function useCreateRecurringDonation() {
  const { data: session } = useSession()
  return async (data: RecurringDonationInput) => {
    return await apiClient.post<
      RecurringDonationResponse,
      AxiosResponse<RecurringDonationResponse>
    >(
      endpoints.recurringDonation.createRecurringDonation.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useEditRecurringDonation(id: string) {
  const { data: session } = useSession()
  return async (data: RecurringDonationInput) => {
    return await apiClient.patch<
      RecurringDonationResponse,
      AxiosResponse<RecurringDonationResponse>
    >(
      endpoints.recurringDonation.editRecurringDonation(id).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useDeleteRecurringDonation(id: string) {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<
      RecurringDonationResponse,
      AxiosResponse<RecurringDonationResponse>
    >(endpoints.recurringDonation.deleteRecurringDonation(id).url, authConfig(session?.accessToken))
  }
}
