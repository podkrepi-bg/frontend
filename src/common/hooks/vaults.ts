import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { VaultResponse } from 'gql/vault'

export function useVaultsList() {
  const { data: session } = useSession()
  return useQuery<VaultResponse[]>(
    [endpoints.vaults.vaultsList.url],
    authQueryFnFactory<VaultResponse[]>(session?.accessToken),
  )
}

export function useVault(id: string) {
  const { data: session } = useSession()
  return useQuery<VaultResponse>(
    [endpoints.vaults.getVault(id).url],
    authQueryFnFactory<VaultResponse>(session?.accessToken),
  )
}

export async function prefetchVaultsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<VaultResponse[]>(
    [endpoints.vaults.vaultsList.url],
    authQueryFnFactory<VaultResponse[]>(token),
  )
}

export async function prefetchVaultById(client: QueryClient, slug: string, token?: string) {
  await client.prefetchQuery<VaultResponse>(
    [endpoints.vaults.getVault(slug).url],
    authQueryFnFactory<VaultResponse>(token),
  )
}
