import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { endpoints } from './apiEndpoints'
import { CompanyResponse } from 'gql/company'
import { authQueryFnFactory } from './restRequests'
import { useQuery } from 'react-query'

export const useCompaniesList = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return useQuery(
    endpoints.company.list.url,
    authQueryFnFactory<CompanyResponse[]>(keycloak?.token),
  )
}

export const useViewCompany = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return useQuery(
    endpoints.company.viewCompany(id).url,
    authQueryFnFactory<CompanyResponse>(keycloak?.token),
  )
}
