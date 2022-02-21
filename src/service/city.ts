import { AxiosResponse } from 'axios'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { apiClient } from 'service/apiClient'

import { endpoints } from './apiEndpoints'
import { authConfig } from './restRequests'
import { MutationFunction } from 'react-query'
import { CityInput, CityResponse } from 'gql/cities'

export const useCreateCityRequest = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CityInput) => {
    return await apiClient.post<CityInput, AxiosResponse<CityResponse>>(
      endpoints.city.createCity.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const useEditCity = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CityInput) => {
    return await apiClient.patch<CityInput, AxiosResponse<CityResponse>>(
      endpoints.city.editCity(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const viewCity = async (data: string) => {
  return await (
    await apiClient.get(endpoints.city.viewCity(data).url)
  ).data
}

export const deleteCity: MutationFunction<AxiosResponse<null>, { id: string }> = async ({
  id,
}: {
  id: string
}) => {
  return await apiClient.delete<null>(endpoints.city.deleteCity(id).url)
}
