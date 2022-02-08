import { useQuery } from 'react-query'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'

import { endpoints } from 'common/api-endpoints'
import { CountryResponse } from 'gql/countries'
import { authQueryFnFactory } from 'common/rest'

export function useCountriesList() {
  return useQuery<CountryResponse[]>(endpoints.country.listCountries.url)
}

export function useCountry(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CountryResponse>(
    endpoints.country.getCountry.url + '/' + id,
    authQueryFnFactory<CountryResponse>(keycloak?.token),
  )
}
