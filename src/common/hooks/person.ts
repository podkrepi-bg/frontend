import { useSession } from 'next-auth/react'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { PersonResponse } from 'gql/person'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

export const usePersonList = (options?: UseQueryOptions<PersonResponse[]>) => {
  const { data: session } = useSession()
  return useQuery<PersonResponse[]>(
    [endpoints.person.list.url],
    authQueryFnFactory<PersonResponse[]>(session?.accessToken),
    options,
  )
}

export function usePerson(id: string) {
  const { data: session } = useSession()
  return useQuery<PersonResponse>(
    [endpoints.person.viewPerson(id).url],
    authQueryFnFactory<PersonResponse>(session?.accessToken),
  )
}

export function useViewPersonByKeylockId(id: string) {
  const { data: session } = useSession()

  return useQuery(
    [endpoints.person.viewPersonByKeylockId(id).url],
    authQueryFnFactory<PersonResponse>(session?.accessToken),
  )
}
