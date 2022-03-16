import { AxiosResponse } from 'axios'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { apiClient } from 'service/apiClient'
import { WithdrawalResponse, WithdrawalInput } from 'gql/withdrawals'

import { endpoints } from './apiEndpoints'
import { authConfig } from './restRequests'

export function useCreateWithdrawal() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: WithdrawalInput) => {
    return await apiClient.post<WithdrawalResponse, AxiosResponse<WithdrawalResponse>>(
      endpoints.withdrawals.createWithdrawal.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useEditWithdrawal(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: WithdrawalInput) => {
    return await apiClient.patch<WithdrawalResponse, AxiosResponse<WithdrawalResponse>>(
      endpoints.withdrawals.editWithdrawal(slug).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteWithdrawal(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<WithdrawalResponse, AxiosResponse<WithdrawalResponse>>(
      endpoints.withdrawals.deleteWithdrawal(slug).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteManyWithdrawals(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<WithdrawalResponse, AxiosResponse<WithdrawalResponse>>(
      endpoints.withdrawals.deleteWithdrawals.url,
      idsToDelete,
      authConfig(keycloak?.token),
    )
  }
}
