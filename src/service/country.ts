import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { CountryInput, CountryResponse } from 'gql/countries'

export const useCreateCountry = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CountryInput) =>
    await apiClient.post<CountryInput, AxiosResponse<CountryResponse>>(
      endpoints.country.createCountry.url,
      data,
      authConfig(keycloak?.token),
    )
}

export const getCountry = async (id: string) => {
  return await apiClient.get<string, AxiosResponse<CountryResponse>>(
    endpoints.country.viewCountry(id).url,
  )
}

export const useEditCountry = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async ({ id, data }: { id: string; data: CountryInput }) => {
    return await apiClient.patch<CountryResponse, AxiosResponse<CountryResponse>>(
      endpoints.country.editCountry(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const useDeleteCountry = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (id: string) => {
    return await apiClient.delete<string, AxiosResponse<CountryResponse>>(
      endpoints.country.deleteCountry(id).url,
      authConfig(keycloak?.token),
    )
  }
}
