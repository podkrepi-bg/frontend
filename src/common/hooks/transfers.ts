import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

import { TransferResponse } from 'gql/transfer'

export function useTransferList() {
  const { data: session } = useSession()
  return useQuery<TransferResponse[]>(
    [endpoints.transfer.listTransfer.url],
    authQueryFnFactory<TransferResponse[]>(session?.accessToken),
  )
}

export function useTransfer(id: string) {
  const { data: session } = useSession()
  return useQuery<TransferResponse>(
    [endpoints.transfer.viewTransfer(id).url],
    authQueryFnFactory<TransferResponse>(session?.accessToken),
  )
}

export async function prefetchTransferList(client: QueryClient, token?: string) {
  await client.prefetchQuery<TransferResponse[]>(
    [endpoints.transfer.listTransfer.url],
    authQueryFnFactory<TransferResponse[]>(token),
  )
}

export async function prefetchTransfer(client: QueryClient, id: string, token?: string) {
  await client.prefetchQuery<TransferResponse[]>(
    [endpoints.transfer.viewTransfer(id).url],
    authQueryFnFactory<TransferResponse[]>(token),
  )
}
