import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'

import { PersonPaginatedResponse, PersonResponse } from 'gql/person'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { PaginationData, SortData } from 'gql/types'

export const usePersonList = (
  paginationData?: PaginationData,
  sort?: SortData,
  searchData?: string,
) => {
  const { data: session } = useSession()
  return useQuery<PersonPaginatedResponse>(
    [endpoints.person.list(paginationData, sort, searchData).url],
    authQueryFnFactory<PersonPaginatedResponse>(session?.accessToken),
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
