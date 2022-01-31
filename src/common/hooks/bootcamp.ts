import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'
import { BootcampResponse } from 'gql/bootcamp'

export function useBootcampList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BootcampResponse[]>(
    endpoints.bootcamp.bootcampList.url,
    authQueryFnFactory<BootcampResponse[]>(keycloak?.token),
  )
}

export async function prefetchBootcampList(client: QueryClient, token?: string) {
  await client.prefetchQuery<BootcampResponse[]>(
    endpoints.bootcamp.bootcampList.url,
    authQueryFnFactory<BootcampResponse[]>(token),
  )
}

export function useBootcampIntern(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BootcampResponse>(
    endpoints.bootcamp.getIntern.url + '/' + id,
    authQueryFnFactory<BootcampResponse>(keycloak?.token),
  )
}
