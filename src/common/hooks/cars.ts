import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from '../api-endpoints'
import { authQueryFnFactory } from '../rest'
import { CarsResponse } from '../../gql/car'

export function useCarsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CarsResponse[]>(
    endpoints.cars.carsList.url,
    authQueryFnFactory<CarsResponse[]>(keycloak?.token),
  )
}

export async function prefetchCarsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<CarsResponse[]>(
    endpoints.cars.carsList.url,
    authQueryFnFactory<CarsResponse[]>(token),
  )
}

export function useCar(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CarsResponse>(
    endpoints.cars.getCar.url + '/' + id,
    authQueryFnFactory<CarsResponse>(keycloak?.token),
  )
}
