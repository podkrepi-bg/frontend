import { AxiosResponse } from 'axios'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { apiClient } from 'service/apiClient'
import { CoorinatorInput, CoordinatorResponse } from 'gql/coordinators'

import { endpoints } from './apiEndpoints'
import { authConfig } from './restRequests'

export const useCreateCoordinatorRequest = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CoorinatorInput) => {
    return await apiClient.post<CoorinatorInput, AxiosResponse<CoordinatorResponse>>(
      endpoints.coordinators.postCoordinator.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const useDeleteCoordinatorRequest = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: string) => {
    return await apiClient.delete<string, AxiosResponse<CoordinatorResponse>>(
      endpoints.coordinators.deleteCoordinator(data).url,
      authConfig(keycloak?.token),
    )
  }
}
