import { AxiosResponse } from 'axios'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { apiClient } from 'service/apiClient'
import { BankAccountResponse, BankAccountInput } from 'gql/bankaccounts'

import { endpoints } from './apiEndpoints'
import { authConfig } from './restRequests'

export const useCreateBankAccountRequest = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: BankAccountInput) => {
    return await apiClient.post<BankAccountInput, AxiosResponse<BankAccountResponse>>(
      endpoints.bankAccounts.postBankAccount.url,
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
