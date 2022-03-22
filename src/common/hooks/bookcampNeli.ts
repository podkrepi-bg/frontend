import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

import { BootcampNeliResponse } from 'gql/bootcampNeli'

export function useBootcampNeliList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BootcampNeliResponse[]>(
    endpoints.bootcampNeli.listBootcampNeli.url,
    authQueryFnFactory<BootcampNeliResponse[]>(keycloak?.token),
  )
}

export function useBootcampNeli(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BootcampNeliResponse>(
    endpoints.bootcampNeli.viewBootcampNeli(id).url,
    authQueryFnFactory<BootcampNeliResponse>(keycloak?.token),
  )
}

export async function prefetchBootCampNeliList(client: QueryClient, token?: string) {
  await client.prefetchQuery<BootcampNeliResponse[]>(
    endpoints.bootcampNeli.listBootcampNeli.url,
    authQueryFnFactory<BootcampNeliResponse[]>(token),
  )
}

export async function prefetchBootCampNeli(client: QueryClient, id: string, token?: string) {
  await client.prefetchQuery<BootcampNeliResponse[]>(
    endpoints.bootcampNeli.viewBootcampNeli(id).url,
    authQueryFnFactory<BootcampNeliResponse[]>(token),
  )
}
