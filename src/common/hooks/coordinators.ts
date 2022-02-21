import { useQuery } from 'react-query'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { endpoints } from 'service/apiEndpoints'
import { CoordinatorResponse } from 'gql/coordinators'
import { authQueryFnFactory } from 'service/restRequests'

export function useCoordinatorsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CoordinatorResponse[]>(endpoints.coordinators.coordinatorsList.url, {
    queryFn: authQueryFnFactory(keycloak?.token),
  })
}

export function useViewCoordinatorResponse(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CoordinatorResponse>(endpoints.coordinators.viewCoordinator(slug).url, {
    retry: 0,
    queryFn: authQueryFnFactory(keycloak?.token),
  })
}
