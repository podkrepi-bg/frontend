import { AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'

import { apiClient } from 'service/apiClient'
import { WithdrawalResponse, WithdrawalData } from 'gql/withdrawals'

import { endpoints } from './apiEndpoints'
import { authConfig } from './restRequests'

export function useCreateWithdrawal() {
  const { data: session } = useSession()
  return async (data: WithdrawalData) => {
    return await apiClient.post<WithdrawalResponse, AxiosResponse<WithdrawalResponse>>(
      endpoints.withdrawals.createWithdrawal.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useEditWithdrawal(slug: string) {
  const { data: session } = useSession()
  return async (data: WithdrawalData) => {
    return await apiClient.patch<WithdrawalResponse, AxiosResponse<WithdrawalResponse>>(
      endpoints.withdrawals.editWithdrawal(slug).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useDeleteWithdrawal(slug: string) {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<WithdrawalResponse, AxiosResponse<WithdrawalResponse>>(
      endpoints.withdrawals.deleteWithdrawal(slug).url,
      authConfig(session?.accessToken),
    )
  }
}
