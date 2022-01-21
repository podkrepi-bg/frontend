import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'

type Tikva = {
  id: string
  firstName: string
  lastName: string
}

export function useTikviList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<Tikva[]>(
    endpoints.tikvi.tikviList.url,
    authQueryFnFactory<Tikva[]>(keycloak?.token),
  )
}

export async function prefetchTikviList(client: QueryClient, token?: string) {
  await client.prefetchQuery<Tikva[]>(
    endpoints.tikvi.tikviList.url,
    authQueryFnFactory<Tikva[]>(token),
  )
}
