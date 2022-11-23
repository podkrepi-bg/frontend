import { useSession } from 'next-auth/react'

import { endpoints } from './apiEndpoints'
import { CompanyResponse } from 'gql/company'
import { authConfig, authQueryFnFactory } from './restRequests'
import { useQuery } from '@tanstack/react-query'
import { AdminCompanyFormData, AdminCompanyResponse } from 'gql/person'
import { apiClient } from './apiClient'
import { AxiosResponse } from 'axios'

export const useCompaniesList = () => {
  const { data: session } = useSession()

  return useQuery(
    [endpoints.company.list.url],
    authQueryFnFactory<CompanyResponse[]>(session?.accessToken),
  )
}

export const useViewCompany = (id: string) => {
  const { data: session } = useSession()

  return useQuery(
    [endpoints.company.viewCompany(id).url],
    authQueryFnFactory<CompanyResponse>(session?.accessToken),
  )
}

export const useCreateCompany = () => {
  const { data: session } = useSession()
  return async (data: AdminCompanyFormData) => {
    return await apiClient.post<AdminCompanyFormData, AxiosResponse<AdminCompanyResponse>>(
      endpoints.company.createCompany.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}
