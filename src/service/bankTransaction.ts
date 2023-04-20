import { AxiosResponse } from 'axios'
import { BankTransactionEditRefInput, BankTransactionEditRefResponse } from 'gql/bank-transactions'
import { useSession } from 'next-auth/react'
import { apiClient } from './apiClient'
import { endpoints } from './apiEndpoints'
import { authConfig } from './restRequests'

export const useExportToExcel = () => {
  const { data: session } = useSession()
  return async () => {
    return await apiClient(endpoints.bankTransactions.exportToExcel.url, {
      ...authConfig(session?.accessToken),
      responseType: 'blob',
    })
  }
}

export function useEditTransactionPaymentRef(slug: string) {
  const { data: session } = useSession()
  return async (data: BankTransactionEditRefInput) => {
    return await apiClient.put<
      BankTransactionEditRefResponse,
      AxiosResponse<BankTransactionEditRefResponse>
    >(endpoints.bankTransactions.editPaymentRef(slug).url, data, authConfig(session?.accessToken))
  }
}
