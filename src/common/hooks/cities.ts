import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { CityResponse } from 'gql/cities'

export function useCitiesList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CityResponse[]>(
    endpoints.city.citiesList.url,
    authQueryFnFactory<CityResponse[]>(keycloak?.token),
  )
}

export function useCity(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CityResponse>(
    endpoints.city.viewCity(id).url,
    authQueryFnFactory<CityResponse>(keycloak?.token),
  )
}
