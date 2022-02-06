import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'
import { CityResponse } from 'gql/cities'

type City = {
  id: string
  name: string
  postalCode: number
}

export function useCitiesList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<City[]>(
    endpoints.city.citiesList.url,
    authQueryFnFactory<City[]>(keycloak?.token),
  )
}

export async function prefetchCityList(client: QueryClient, token?: string) {
  await client.prefetchQuery<City[]>(
    endpoints.city.citiesList.url,
    authQueryFnFactory<City[]>(token),
  )
}

export async function useViewCity(id: string) {
  return useQuery<{ City: CityResponse }>(endpoints.city.viewCity(id).url)
}
