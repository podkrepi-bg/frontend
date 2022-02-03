import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'
import { BootcampIntern } from 'lib/interfaces/BootcampIntern'

export function useBootcampInternsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BootcampIntern[]>(
    endpoints.bootcampIntern.listBootcampIntern.url,
    authQueryFnFactory<BootcampIntern[]>(keycloak?.token),
  )
}

export async function prefetchBootcampInternsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<BootcampIntern[]>(
    endpoints.bootcampIntern.listBootcampIntern.url,
    authQueryFnFactory<BootcampIntern[]>(token),
  )
}

export function useFetchBootcampIntern(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BootcampIntern>(
    `${endpoints.bootcampIntern.listBootcampIntern.url}/${id}`,
    authQueryFnFactory<BootcampIntern>(keycloak?.token),
  )
}
