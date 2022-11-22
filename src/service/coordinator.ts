import { AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'

import { apiClient } from 'service/apiClient'
import { CoorinatorInput, CoordinatorResponse } from 'gql/coordinators'

import { endpoints } from './apiEndpoints'
import { authConfig, authQueryFnFactory } from './restRequests'

export const useCoordinatorsList = () => {
  const { data: session } = useSession()

  return useQuery(
    [endpoints.coordinators.coordinatorsList.url],
    authQueryFnFactory<CoordinatorResponse[]>(session?.accessToken),
  )
}

export const useCreateCoordinator = () => {
  const { data: session } = useSession()
  return async (data: CoorinatorInput) => {
    return await apiClient.post<CoorinatorInput, AxiosResponse<CoordinatorResponse>>(
      endpoints.coordinators.postCoordinator.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const useDeleteCoordinator = () => {
  const { data: session } = useSession()
  return async (data: string) => {
    return await apiClient.delete<string, AxiosResponse<CoordinatorResponse>>(
      endpoints.coordinators.deleteCoordinator(data).url,
      authConfig(session?.accessToken),
    )
  }
}
