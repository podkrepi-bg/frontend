import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { VaultResponse } from 'gql/vault'

export function useVaultsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<VaultResponse[]>(
    endpoints.vaults.vaultsList.url,
    authQueryFnFactory<VaultResponse[]>(keycloak?.token),
  )
}

export function useVault(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<VaultResponse>(
    endpoints.vaults.getVault(id).url,
    authQueryFnFactory<VaultResponse>(keycloak?.token),
  )
}

export async function prefetchVaultsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<VaultResponse[]>(
    endpoints.vaults.vaultsList.url,
    authQueryFnFactory<VaultResponse[]>(token),
  )
}

export async function prefetchVaultById(client: QueryClient, slug: string, token?: string) {
  await client.prefetchQuery<VaultResponse>(
    endpoints.vaults.getVault(slug).url,
    authQueryFnFactory<VaultResponse>(token),
  )
}
