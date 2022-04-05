import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

import { TransferResponse } from 'gql/transfer'

export function useTransferList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<TransferResponse[]>(
    endpoints.transfer.listTransfer.url,
    authQueryFnFactory<TransferResponse[]>(keycloak?.token),
  )
}

export function useTransfer(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<TransferResponse>(
    endpoints.transfer.viewTransfer(id).url,
    authQueryFnFactory<TransferResponse>(keycloak?.token),
  )
}

export async function prefetchTransferList(client: QueryClient, token?: string) {
  await client.prefetchQuery<TransferResponse[]>(
    endpoints.transfer.listTransfer.url,
    authQueryFnFactory<TransferResponse[]>(token),
  )
}

export async function prefetchTransfer(client: QueryClient, id: string, token?: string) {
  await client.prefetchQuery<TransferResponse[]>(
    endpoints.transfer.viewTransfer(id).url,
    authQueryFnFactory<TransferResponse[]>(token),
  )
}
