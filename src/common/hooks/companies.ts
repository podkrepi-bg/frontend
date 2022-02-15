import { QueryClient, useQuery } from 'react-query'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { CompanyResponse } from 'gql/companies'

export function useCompaniesList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CompanyResponse[]>(
    endpoints.company.listCompanies.url,
    authQueryFnFactory<CompanyResponse[]>(keycloak?.token),
  )
}

export function useCompanyById(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CompanyResponse>(
    endpoints.company.editCompany(slug).url,
    authQueryFnFactory<CompanyResponse>(keycloak?.token),
  )
}

export async function prefetchCompanyById(client: QueryClient, slug: string, token?: string) {
  await client.prefetchQuery<CompanyResponse>(
    endpoints.company.editCompany(slug).url,
    authQueryFnFactory<CompanyResponse>(token),
  )
}
