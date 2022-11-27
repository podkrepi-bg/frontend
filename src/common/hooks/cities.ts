import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { CityResponse } from 'gql/cities'

export function useCitiesList() {
  const { data: session } = useSession()
  return useQuery<CityResponse[]>(
    [endpoints.city.citiesList.url],
    authQueryFnFactory<CityResponse[]>(session?.accessToken),
  )
}

export function useCity(id: string) {
  const { data: session } = useSession()
  return useQuery<CityResponse>(
    [endpoints.city.viewCity(id).url],
    authQueryFnFactory<CityResponse>(session?.accessToken),
  )
}
