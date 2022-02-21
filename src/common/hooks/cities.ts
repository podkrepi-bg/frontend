import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { CityResponse } from 'gql/cities'

type City = {
  id: string
  name: string
  postalCode: string
  countryId: string
}

type Country = {
  id: string
  name: string
  countryCode: string
  cities: []
}

export function useCity(id: string) {
  return useQuery<CityResponse>(endpoints.city.viewCity(id).url)
}

export function useCitiesList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<City[]>(
    endpoints.city.citiesList.url,
    authQueryFnFactory<City[]>(keycloak?.token),
  )
}

export function useCountriesList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const counties = useQuery<Country[]>(
    endpoints.country.listCountries.url,
    authQueryFnFactory<Country[]>(keycloak?.token),
  )
  return counties.data
}

export async function prefetchCountryList(client: QueryClient, token?: string) {
  await client.prefetchQuery<Country[]>(
    endpoints.country.listCountries.url,
    authQueryFnFactory<Country[]>(token),
  )
}

export async function prefetchCityList(client: QueryClient, token?: string) {
  await client.prefetchQuery<City[]>(
    endpoints.city.citiesList.url,
    authQueryFnFactory<City[]>(token),
  )
}
