import { AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { authConfig } from 'service/restRequests'

import { TransferInput, TransferResponse } from 'gql/transfer'

export const useCreateTransfer = () => {
  const { data: session } = useSession()
  return async (data: TransferInput) => {
    return await apiClient.post<TransferInput, AxiosResponse<TransferResponse>>(
      endpoints.transfer.createTransfer.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const useEditTransfer = (id: string) => {
  const { data: session } = useSession()
  return async (data: TransferInput) => {
    return await apiClient.put<TransferInput, AxiosResponse<TransferResponse>>(
      endpoints.transfer.editTransfer(id).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const useDeleteTransfer = (id: string) => {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<TransferResponse, AxiosResponse<TransferResponse>>(
      endpoints.transfer.removeTransfer(id).url,
      authConfig(session?.accessToken),
    )
  }
}
