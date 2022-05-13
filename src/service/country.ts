import { useSession } from 'next-auth/react'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { CountryInput, CountryResponse } from 'gql/countries'

export const useCreateCountry = () => {
  const { data: session } = useSession()
  return async (data: CountryInput) =>
    await apiClient.post<CountryInput, AxiosResponse<CountryResponse>>(
      endpoints.country.createCountry.url,
      data,
      authConfig(session?.accessToken),
    )
}

export const getCountry = async (id: string) => {
  return await apiClient.get<string, AxiosResponse<CountryResponse>>(
    endpoints.country.viewCountry(id).url,
  )
}

export const useEditCountry = () => {
  const { data: session } = useSession()
  return async ({ id, data }: { id: string; data: CountryInput }) => {
    return await apiClient.patch<CountryResponse, AxiosResponse<CountryResponse>>(
      endpoints.country.editCountry(id).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const useDeleteCountry = () => {
  const { data: session } = useSession()
  return async (id: string) => {
    return await apiClient.delete<string, AxiosResponse<CountryResponse>>(
      endpoints.country.deleteCountry(id).url,
      authConfig(session?.accessToken),
    )
  }
}
