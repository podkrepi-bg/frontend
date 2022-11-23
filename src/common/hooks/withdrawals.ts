import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { WithdrawalEditResponse, WithdrawalResponse } from 'gql/withdrawals'

export function useWithdrawalsList() {
  const { data: session } = useSession()
  return useQuery<WithdrawalResponse[]>(
    [endpoints.withdrawals.withdrawalsList.url],
    authQueryFnFactory<WithdrawalResponse[]>(session?.accessToken),
  )
}

export function useWithdrawal(id: string) {
  const { data: session } = useSession()
  return useQuery<WithdrawalEditResponse>(
    [endpoints.withdrawals.getWithdrawal(id).url],
    authQueryFnFactory<WithdrawalEditResponse>(session?.accessToken),
  )
}

export function useWithdrawalDetailsPage(id: string) {
  const { data: session } = useSession()
  return useQuery<WithdrawalResponse>(
    [endpoints.withdrawals.getWithdrawal(id).url],
    authQueryFnFactory<WithdrawalResponse>(session?.accessToken),
  )
}

export async function prefetchWithdrawalsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<WithdrawalResponse[]>(
    [endpoints.withdrawals.withdrawalsList.url],
    authQueryFnFactory<WithdrawalResponse[]>(token),
  )
}

export async function prefetchWithdrawalById(client: QueryClient, id: string, token?: string) {
  await client.prefetchQuery<WithdrawalResponse>(
    [endpoints.withdrawals.getWithdrawal(id).url],
    authQueryFnFactory<WithdrawalResponse>(token),
  )
}
