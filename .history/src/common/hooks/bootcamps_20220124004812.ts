import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'

type Bootcamp = {
  id: string
  firstName: string
  lastName: string
}

export function useBootcampList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<Bootcamp[]>(
    endpoints.bootcamp.bootcampList.url,
    authQueryFnFactory<Bootcamp[]>(keycloak?.token),
  )
}

export async function prefetchBootcampList(client: QueryClient, token?: string) {
  await client.prefetchQuery<Bootcamp[]>(
    endpoints.bootcamp.bootcampList.url,
    authQueryFnFactory<Bootcamp[]>(token),
  )
}
