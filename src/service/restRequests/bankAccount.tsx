import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { BankAccountInput, BankAccountResponse } from 'gql/bankaccounts'

export const useCreateBankAccount = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: BankAccountInput) => {
    return await apiClient.post<BankAccountInput, AxiosResponse<BankAccountResponse>>(
      endpoints.bankAccounts.createBankAccount.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const useEditBankAccount = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: BankAccountInput) => {
    return await apiClient.patch<BankAccountInput, AxiosResponse<BankAccountResponse>>(
      endpoints.bankAccounts.editBankAccount(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteBankAccount(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<BankAccountResponse, AxiosResponse<BankAccountResponse>>(
      endpoints.bankAccounts.deleteBankAccount(id).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteManyBankAccounts(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<BankAccountResponse, AxiosResponse<BankAccountResponse>>(
      endpoints.bankAccounts.deleteManyBankAccounts.url,
      idsToDelete,
      authConfig(keycloak?.token),
    )
  }
}
