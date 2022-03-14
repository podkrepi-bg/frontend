import { AxiosResponse } from 'axios'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { apiClient } from 'service/apiClient'
import { CoordinatorResponse } from 'gql/coordinators'
import { endpoints } from '../apiEndpoints'
import { authConfig } from '../restRequests'

export const useDeleteCoordinator = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: string) => {
    return await apiClient.delete<string, AxiosResponse<CoordinatorResponse>>(
      endpoints.coordinators.deleteCoordinator(data).url,
      authConfig(keycloak?.token),
    )
  }
}
