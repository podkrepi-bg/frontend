import { AxiosResponse } from 'axios'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'

import { BootcampNeliInput, BootcampNeliResponse } from 'gql/bootcampNeli'

export const useCreateBootcampNeli = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: BootcampNeliInput) => {
    return await apiClient.post<BootcampNeliInput, AxiosResponse<BootcampNeliResponse>>(
      endpoints.bootcampNeli.createBootcampNeli.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const useEditBootcampNeli = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: BootcampNeliInput) => {
    return await apiClient.put<BootcampNeliInput, AxiosResponse<BootcampNeliResponse>>(
      endpoints.bootcampNeli.editBootcampNeli(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const useDeleteBootcampNeli = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<BootcampNeliResponse, AxiosResponse<BootcampNeliResponse>>(
      endpoints.bootcampNeli.removeBootcampNeli(id).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteManyBootcampNeli(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<BootcampNeliResponse, AxiosResponse<BootcampNeliResponse>>(
      endpoints.bootcampNeli.removeManyBootcampNeli.url,
      idsToDelete,
      authConfig(keycloak?.token),
    )
  }
}
