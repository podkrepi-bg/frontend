import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'

export interface ExpenseInterface {
  id?: string
  type: string
  currency: string
  amount: number
  vaultId: '549d7f14-99f5-447c-8d72-a2c06edf7568'
  description?: string
}

export function useExpensesList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<ExpenseInterface[]>(
    endpoints.expenses.listExpenses.url,
    authQueryFnFactory<ExpenseInterface[]>(keycloak?.token),
  )
}

export async function prefectExpensesList(client: QueryClient, token?: string) {
  await client.prefetchQuery<ExpenseInterface[]>(
    endpoints.expenses.listExpenses.url,
    authQueryFnFactory<ExpenseInterface[]>(token),
  )
}

export function useFetchExpense(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<ExpenseInterface>(
    `${endpoints.expenses.listExpenses.url}/${id}`,
    authQueryFnFactory<ExpenseInterface>(keycloak?.token),
  )
}
