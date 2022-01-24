//external imports
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { QueryClient, useQuery } from 'react-query'

//absolute imports
import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'
import { keycloakInstance } from 'common/util/keycloak'

//relative imports

// define the type of the data
type BootcampIntern = {
  id: string
  firstName: string
  lastName: string
  email: string
}

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
