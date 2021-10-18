import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, QueryFunction, useQuery } from 'react-query'

import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'

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
    authQueryFn(keycloak?.token),
  )
}

const authQueryFn = (token?: string): QueryFunction<InfoRequest[]> => {
  return async function ({ queryKey }) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const response = await axios.get(queryKey.join('/'), { headers })
    return await response.data
  }
}

export async function prefetchInfoRequestList(client: QueryClient, token?: string) {
  await client.prefetchQuery<InfoRequest[]>(
    endpoints.support.infoRequestList.url,
    authQueryFn(token),
  )
}
