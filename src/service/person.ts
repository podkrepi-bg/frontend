import { useSession } from 'next-auth/react'

import { endpoints } from './apiEndpoints'
import { PersonResponse } from 'gql/person'
import { authQueryFnFactory } from './restRequests'
import { useQuery } from 'react-query'

export const usePeopleList = () => {
  const { data: session } = useSession()

  return useQuery(
    endpoints.person.list.url,
    authQueryFnFactory<PersonResponse[]>(session?.accessToken),
  )
}

export const useViewPerson = (id: string) => {
  const { data: session } = useSession()

  return useQuery(
    endpoints.person.viewPerson(id).url,
    authQueryFnFactory<PersonResponse>(session?.accessToken),
  )
}
