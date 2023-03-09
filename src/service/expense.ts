import { useSession } from 'next-auth/react'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { ExpenseInput, ExpenseResponse, UploadExpenseFile, ExpenseFile } from 'gql/expenses'
import { Session } from 'next-auth'

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

export const useUploadExpenseFiles = () => {
  const { data: session } = useSession()
  return async ({ files, expenseId }: UploadExpenseFile) => {
    const formData = new FormData()
    files.forEach((file: File) => {
      formData.append('file', file)
    })
    return await apiClient.post<FormData, AxiosResponse<ExpenseFile[]>>(
      endpoints.expenses.uploadFile(expenseId).url,
      formData,
      {
        headers: {
          ...authConfig(session?.accessToken).headers,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }
}

export const downloadCampaignExpenseFile = (id: string, session: Session | null) => {
  return apiClient(endpoints.expenses.downloadFile(id).url, {
    ...authConfig(session?.accessToken),
    responseType: 'blob',
  })
}

export const deleteExpenseFile = (id: string, session: Session | null) => {
  return apiClient.delete(
    endpoints.expenses.deleteExpenseFile(id).url,
    authConfig(session?.accessToken),
  )
}
