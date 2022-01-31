//external imports
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { QueryClient, useQuery } from 'react-query'

//absolute imports
import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'

//relative imports
import { BootcampIntern } from 'lib/interfaces/BootcampIntern'

export function useBootcampInternsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>() // initializing a keyCloak instance;
  return useQuery<BootcampIntern[]>(
    endpoints.bootcampIntern.listBootcampIntern.url,
    authQueryFnFactory<BootcampIntern[]>(keycloak?.token),
  )
}

// prefetch query
export async function prefetchBootcampInternsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<BootcampIntern[]>(
    endpoints.bootcampIntern.listBootcampIntern.url,
    authQueryFnFactory<BootcampIntern[]>(token),
  )
}

// query for a single intern
export function useFetchBootcampIntern(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BootcampIntern>(
    `${endpoints.bootcampIntern.listBootcampIntern.url}/${id}`,
    authQueryFnFactory<BootcampIntern>(keycloak?.token),
  )
}
