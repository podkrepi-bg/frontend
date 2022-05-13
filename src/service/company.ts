import { useSession } from 'next-auth/react'

import { endpoints } from './apiEndpoints'
import { CompanyResponse } from 'gql/company'
import { authQueryFnFactory } from './restRequests'
import { useQuery } from 'react-query'

export const useCompaniesList = () => {
  const { data: session } = useSession()

  return useQuery(
    endpoints.company.list.url,
    authQueryFnFactory<CompanyResponse[]>(session?.accessToken),
  )
}

export const useViewCompany = (id: string) => {
  const { data: session } = useSession()

  return useQuery(
    endpoints.company.viewCompany(id).url,
    authQueryFnFactory<CompanyResponse>(session?.accessToken),
  )
}
