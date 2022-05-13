import { useSession } from 'next-auth/react'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { VaultInput, VaultResponse } from 'gql/vault'

export function useCreateVault() {
  const { data: session } = useSession()
  return async (data: VaultInput) => {
    return await apiClient.post<VaultResponse, AxiosResponse<VaultResponse>>(
      endpoints.vaults.createVault.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useEditVault(slug: string) {
  const { data: session } = useSession()
  return async (data: VaultInput) => {
    return await apiClient.patch<VaultResponse, AxiosResponse<VaultResponse>>(
      endpoints.vaults.editVault(slug).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useDeleteVault(slug: string) {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<VaultResponse, AxiosResponse<VaultResponse>>(
      endpoints.vaults.deleteVault(slug).url,
      authConfig(session?.accessToken),
    )
  }
}
