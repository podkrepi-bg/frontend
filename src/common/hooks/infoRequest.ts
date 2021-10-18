import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'

type InfoRequest = {
  id: string
  personId: string
  message: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export function useInfoRequestList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<InfoRequest[]>(
    endpoints.support.infoRequestList.url,
    authQueryFnFactory<InfoRequest[]>(keycloak?.token),
  )
}

export async function prefetchInfoRequestList(client: QueryClient, token?: string) {
  await client.prefetchQuery<InfoRequest[]>(
    endpoints.support.infoRequestList.url,
    authQueryFnFactory<InfoRequest[]>(token),
  )
}
