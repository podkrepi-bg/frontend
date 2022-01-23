import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'

type Car = {
  id: string
  brand: string
  model: string
  year: number
}

export function useCarsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<Car[]>(endpoints.cars.carsList.url, authQueryFnFactory<Car[]>(keycloak?.token))
}

export async function prefetchCarsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<Car[]>(endpoints.cars.carsList.url, authQueryFnFactory<Car[]>(token))
}

export function useFetchCar(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<Car>(
    `${endpoints.cars.carsList.url}/${id}`,
    authQueryFnFactory<Car>(keycloak?.token),
  )
}
