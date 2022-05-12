import { useSession } from 'next-auth/react'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { CityInput, CityResponse } from 'gql/cities'

export function useCreateCity() {
  const { data: session } = useSession()
  return async (data: CityInput) => {
    return await apiClient.post<CityResponse, AxiosResponse<CityResponse>>(
      endpoints.city.createCity.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useEditCity(id: string) {
  const { data: session } = useSession()
  return async (data: CityInput) => {
    return await apiClient.patch<CityResponse, AxiosResponse<CityResponse>>(
      endpoints.city.editCity(id).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useDeleteCity() {
  const { data: session } = useSession()
  return async (id: string) => {
    return await apiClient.delete<CityResponse, AxiosResponse<CityResponse>>(
      endpoints.city.deleteCity(id).url,
      authConfig(session?.accessToken),
    )
  }
}
