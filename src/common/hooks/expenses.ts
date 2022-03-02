import { useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { ExpenseResponse } from 'gql/expenses'

export function useExpensesList() {
  return useQuery<ExpenseResponse[]>(endpoints.expenses.listExpenses.url)
}

export function useExpense(id: string) {
  return useQuery<ExpenseResponse>(endpoints.expenses.viewExpense(id).url)
}
