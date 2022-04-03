import { useQuery } from 'react-query'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { PersonFormData } from 'gql/person'
import { endpoints } from 'service/apiEndpoints'
import { BeneficiaryResponse } from 'gql/beneficiary'
import { authQueryFnFactory } from 'service/restRequests'

export function useBeneficiariesList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BeneficiaryResponse[]>(endpoints.beneficiary.listBeneficiary.url, {
    queryFn: authQueryFnFactory(keycloak?.token),
  })
}

export function useDeleteBeneficiary(slug: string) {
  return useQuery<PersonFormData>(endpoints.beneficiary.removeBeneficiary(slug).url)
}

export function useViewBeneficiary(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BeneficiaryResponse>(endpoints.beneficiary.viewBeneficiary(id).url, {
    retry: 0,
    queryFn: authQueryFnFactory(keycloak?.token),
  })
}
