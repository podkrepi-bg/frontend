import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import axios, { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { BootcampInput, BootcampResponse, DeleteMany } from 'gql/bootcamp'
import { MutationFunction } from 'react-query'

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

export function useDeleteMany(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<DeleteMany, AxiosResponse<BootcampResponse[]>>(
      endpoints.bootcamp.removeMany.url,
      { ids: idsToDelete },
      authConfig(keycloak?.token),
    )
  }
}
