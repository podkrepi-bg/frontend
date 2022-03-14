import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { VaultInput, VaultResponse } from 'gql/vault'

export function useCreateVault() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: VaultInput) => {
    return await apiClient.post<VaultResponse, AxiosResponse<VaultResponse>>(
      endpoints.vaults.createVault.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useEditVault(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: VaultInput) => {
    return await apiClient.patch<VaultResponse, AxiosResponse<VaultResponse>>(
      endpoints.vaults.editVault(slug).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteVault(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<VaultResponse, AxiosResponse<VaultResponse>>(
      endpoints.vaults.deleteVault(slug).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteManyVaults(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<VaultResponse, AxiosResponse<VaultResponse>>(
      endpoints.vaults.deleteVaults.url,
      idsToDelete,
      authConfig(keycloak?.token),
    )
  }
}
