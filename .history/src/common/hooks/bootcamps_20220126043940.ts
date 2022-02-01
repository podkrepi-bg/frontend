import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'
import { BootcampResponse } from 'gql/bootcamps'

type Bootcamp = {
  id: string
  firstName: string
  lastName: string
}

export function useBootcampsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<Bootcamp[]>(
    endpoints.bootcamp.bootcampsList.url,
    authQueryFnFactory<Bootcamp[]>(keycloak?.token),
  )
}

export async function prefetchBootcampList(client: QueryClient, token?: string) {
  await client.prefetchQuery<Bootcamp[]>(
    endpoints.bootcamp.bootcampsList.url,
    authQueryFnFactory<Bootcamp[]>(token),
  )
}

export async function useViewBootcamp(id: string) {
  return useQuery<{ data: BootcampResponse }>(endpoints.bootcamp.viewBootcamp(id).url)
}
