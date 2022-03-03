import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { WithdrawalResponse } from 'gql/withdrawals'

export function useWithdrawalsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<WithdrawalResponse[]>(
    endpoints.withdrawals.withdrawalsList.url,
    authQueryFnFactory<WithdrawalResponse[]>(keycloak?.token),
  )
}

export function useWithdrawal(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<WithdrawalResponse>(
    endpoints.withdrawals.getWithdrawal(id).url,
    authQueryFnFactory<WithdrawalResponse>(keycloak?.token),
  )
}

export async function prefetchWithdrawalsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<WithdrawalResponse[]>(
    endpoints.withdrawals.withdrawalsList.url,
    authQueryFnFactory<WithdrawalResponse[]>(token),
  )
}

export async function prefetchWithdrawalById(client: QueryClient, id: string, token?: string) {
  await client.prefetchQuery<WithdrawalResponse>(
    endpoints.withdrawals.getWithdrawal(id).url,
    authQueryFnFactory<WithdrawalResponse>(token),
  )
}
