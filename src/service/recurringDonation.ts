import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { RecurringDonationInput, RecurringDonationResponse } from 'gql/recurring-donation'

export function useCreateRecurringDonation() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: RecurringDonationInput) => {
    return await apiClient.post<
      RecurringDonationResponse,
      AxiosResponse<RecurringDonationResponse>
    >(endpoints.recurringDonation.createRecurringDonation.url, data, authConfig(keycloak?.token))
  }
}

export function useEditRecurringDonation(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: RecurringDonationInput) => {
    return await apiClient.patch<
      RecurringDonationResponse,
      AxiosResponse<RecurringDonationResponse>
    >(endpoints.recurringDonation.editRecurringDonation(id).url, data, authConfig(keycloak?.token))
  }
}

export function useDeleteRecurringDonation(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<
      RecurringDonationResponse,
      AxiosResponse<RecurringDonationResponse>
    >(endpoints.recurringDonation.deleteRecurringDonation(id).url, authConfig(keycloak?.token))
  }
}
