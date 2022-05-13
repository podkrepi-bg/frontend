import { useSession } from 'next-auth/react'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { ExpenseInput, ExpenseResponse } from 'gql/expenses'

export function useCreateExpense() {
  const { data: session } = useSession()
  return async (data: ExpenseInput) => {
    return await apiClient.post<ExpenseResponse, AxiosResponse<ExpenseResponse>>(
      endpoints.expenses.createExpense.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useEditExpense(id: string) {
  const { data: session } = useSession()
  return async (data: ExpenseInput) => {
    return await apiClient.patch<ExpenseResponse, AxiosResponse<ExpenseResponse>>(
      endpoints.expenses.editExpense(id).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useDeleteExpense() {
  const { data: session } = useSession()
  return async (id: string) => {
    return await apiClient.delete<ExpenseResponse, AxiosResponse<ExpenseResponse>>(
      endpoints.expenses.deleteExpense(id).url,
      authConfig(session?.accessToken),
    )
  }
}
