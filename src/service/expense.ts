import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { ExpenseInput, ExpenseResponse } from 'gql/expenses'

export function useCreateExpense() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: ExpenseInput) => {
    return await apiClient.post<ExpenseResponse, AxiosResponse<ExpenseResponse>>(
      endpoints.expenses.createExpense.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useEditExpense(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: ExpenseInput) => {
    return await apiClient.put<ExpenseResponse, AxiosResponse<ExpenseResponse>>(
      endpoints.expenses.editExpense(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteExpense() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (id: string) => {
    return await apiClient.delete<ExpenseResponse, AxiosResponse<ExpenseResponse>>(
      endpoints.expenses.deleteExpense(id).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteManyExpenses(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<ExpenseResponse, AxiosResponse<ExpenseResponse>>(
      endpoints.expenses.deleteExpenses.url,
      {
        headers: authConfig(keycloak?.token).headers,
        data: idsToDelete,
      },
    )
  }
}
