import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'

import { endpoints } from 'service/apiEndpoints'
import { ExpenseResponse } from 'gql/expenses'
import { authQueryFnFactory } from 'service/restRequests'

export function useExpensesList() {
  const { data: session } = useSession()
  return useQuery<ExpenseResponse[]>(endpoints.expenses.listExpenses.url, {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function useViewExpense(id: string) {
  const { data: session } = useSession()
  return useQuery<ExpenseResponse>(endpoints.expenses.viewExpense(id).url, {
    retry: 0,
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}
