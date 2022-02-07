import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { CompanyResponse } from 'gql/companies'

export function useCompaniesList() {
  return useQuery<CompanyResponse[]>(endpoints.company.listCompanies.url)
}

export function useCompanyById(slug: string) {
  return useQuery<CompanyResponse>(endpoints.company.editCompany(slug).url)
}
