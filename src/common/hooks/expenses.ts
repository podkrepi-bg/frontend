import { useQuery } from 'react-query'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { endpoints } from 'service/apiEndpoints'
import { ExpenseResponse } from 'gql/expenses'
import { authQueryFnFactory } from 'service/restRequests'

export function useExpensesList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<ExpenseResponse[]>(endpoints.expenses.listExpenses.url, {
    queryFn: authQueryFnFactory(keycloak?.token),
  })
}

export function useViewExpense(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<ExpenseResponse>(endpoints.expenses.viewExpense(id).url, {
    queryFn: authQueryFnFactory(keycloak?.token),
  })
}
