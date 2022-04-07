import { AxiosResponse } from 'axios'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { authConfig } from 'service/restRequests'

import { TransferInput, TransferResponse } from 'gql/transfer'

export const useCreateTransfer = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: TransferInput) => {
    return await apiClient.post<TransferInput, AxiosResponse<TransferResponse>>(
      endpoints.transfer.createTransfer.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const useEditTransfer = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: TransferInput) => {
    return await apiClient.put<TransferInput, AxiosResponse<TransferResponse>>(
      endpoints.transfer.editTransfer(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const useDeleteTransfer = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<TransferResponse, AxiosResponse<TransferResponse>>(
      endpoints.transfer.removeTransfer(id).url,
      authConfig(keycloak?.token),
    )
  }
}
