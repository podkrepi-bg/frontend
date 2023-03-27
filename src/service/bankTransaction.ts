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
