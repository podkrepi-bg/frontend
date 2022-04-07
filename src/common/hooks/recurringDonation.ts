import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { RecurringDonationResponse } from 'gql/recurring-donation'

export function useRecurringDonationList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<RecurringDonationResponse[]>(
    endpoints.recurringDonation.recurringDonation.url,
    authQueryFnFactory<RecurringDonationResponse[]>(keycloak?.token),
  )
}
