import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

export type InfoRequest = {
  id: string
  personId: string
  message: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type InfoRequestInput = {
  message: string
}

export function useInfoRequestList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<InfoRequest[]>(
    endpoints.infoRequest.infoRequestList.url,
    authQueryFnFactory<InfoRequest[]>(keycloak?.token),
  )
}

export async function prefetchInfoRequestList(client: QueryClient, token?: string) {
  await client.prefetchQuery<InfoRequest[]>(
    endpoints.infoRequest.infoRequestList.url,
    authQueryFnFactory<InfoRequest[]>(token),
  )
}

export async function prefetchInfoRequest(client: QueryClient, token?: string) {
  await client.prefetchQuery<InfoRequest[]>(
    endpoints.infoRequest.infoRequestList.url,
    authQueryFnFactory<InfoRequest[]>(token),
  )
}

export function useInfoRequest(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<InfoRequest[]>(
    endpoints.infoRequest.getById(slug).url,
    authQueryFnFactory<InfoRequest[]>(keycloak?.token),
  )
}
