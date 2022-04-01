import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { BootcampInput, BootcampResponse } from 'gql/bootcamp'

export function useCreateBootcamp() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: BootcampInput) => {
    return await apiClient.post<BootcampResponse, AxiosResponse<BootcampResponse>>(
      endpoints.bootcamp.createNewTask.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useEditBootcamp(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: BootcampInput) => {
    return await apiClient.patch<BootcampResponse, AxiosResponse<BootcampResponse>>(
      endpoints.bootcamp.editTask(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteBootcamp() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (id: string) => {
    return await apiClient.delete<BootcampResponse, AxiosResponse<BootcampResponse>>(
      endpoints.bootcamp.deleteTask(id).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteMany() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (ids: string[]) => {
    return ids.map(async (id) => {
      return await apiClient.delete<BootcampResponse, AxiosResponse<BootcampResponse>>(
        endpoints.bootcamp.deleteTask(id).url,
        authConfig(keycloak?.token),
      )
    })
  }
}
