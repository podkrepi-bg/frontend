import { useSession } from 'next-auth/react'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { BankAccountInput, BankAccountResponse } from 'gql/bankaccounts'

export const useCreateBankAccount = () => {
  const { data: session } = useSession()
  return async (data: BankAccountInput) => {
    return await apiClient.post<BankAccountInput, AxiosResponse<BankAccountResponse>>(
      endpoints.bankAccounts.createBankAccount.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const useEditBankAccount = (id: string) => {
  const { data: session } = useSession()
  return async (data: BankAccountInput) => {
    return await apiClient.patch<BankAccountInput, AxiosResponse<BankAccountResponse>>(
      endpoints.bankAccounts.editBankAccount(id).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useDeleteBankAccount(id: string) {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<BankAccountResponse, AxiosResponse<BankAccountResponse>>(
      endpoints.bankAccounts.deleteBankAccount(id).url,
      authConfig(session?.accessToken),
    )
  }
}
