import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { CityInput, CityResponse } from 'gql/cities'

export function useCreateCity() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CityInput) => {
    return await apiClient.post<CityResponse, AxiosResponse<CityResponse>>(
      endpoints.city.createCity.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useEditCity(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CityInput) => {
    return await apiClient.patch<CityResponse, AxiosResponse<CityResponse>>(
      endpoints.city.editCity(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteCity(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<CityResponse, AxiosResponse<CityResponse>>(
      endpoints.city.deleteCity(id).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteMany() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (ids: string[]) => {
    return ids.map(async (id) => {
      return await apiClient.delete<CityResponse, AxiosResponse<CityResponse>>(
        endpoints.city.deleteCity(id).url,
        authConfig(keycloak?.token),
      )
    })
  }
}
