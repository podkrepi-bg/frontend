import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { BootcampResponse, BootcampTypeFormData, DeleteMany } from 'gql/bootcamp'
import { useQuery } from 'react-query'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { authConfig, authQueryFnFactory } from './restRequests'

export const createBootcamp = async (data: BootcampTypeFormData) => {
  return await apiClient.post<BootcampTypeFormData, AxiosResponse<BootcampResponse>>(
    endpoints.bootcamp.createOne.url,
    data,
  )
}

export const getAllBootcamp = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return useQuery(
    endpoints.bootcamp.getAll.url,
    authQueryFnFactory<BootcampResponse[]>(keycloak?.token),
  )
}

export const deleteBootcamp = async (id: string) => {
  return await apiClient.delete<string, AxiosResponse<BootcampResponse>>(
    endpoints.bootcamp.deleteOne(id).url,
  )
}

export const editBootcamp = async ({ id, data }: { id: string; data: BootcampTypeFormData }) => {
  return await apiClient.patch<string, AxiosResponse<BootcampResponse>>(
    endpoints.bootcamp.editOne(id).url,
    data,
  )
}

export function removeManyBootcamps(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<DeleteMany, AxiosResponse<BootcampResponse[]>>(
      endpoints.bootcamp.removeMany.url,
      { ids: idsToDelete },
      authConfig(keycloak?.token),
    )
  }
}
