import { useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { PersonFormData } from 'gql/person'
import { BeneficiaryResponse, BeneficiaryType } from 'gql/beneficiary'
import { KeycloakInstance } from 'keycloak-js'
import { authQueryFnFactory } from 'service/restRequests'
import { useKeycloak } from '@react-keycloak/ssr'

export function useBeneficiariesList() {
  return useQuery<PersonFormData[]>(endpoints.beneficiary.listBeneficiary.url)
}

export function useBeneficiariesListPerson() {
  return useQuery<BeneficiaryResponse[]>(endpoints.beneficiary.listBeneficiary.url)
}

export function useViewBeneficiary(slug: string) {
  return useQuery<PersonFormData>(endpoints.beneficiary.viewBeneficiary(slug).url)
}

export function useDeleteBeneficiary(slug: string) {
  return useQuery<PersonFormData>(endpoints.beneficiary.removeBeneficiary(slug).url)
}

export function useViewBeneficiaryId() {
  return useQuery<BeneficiaryType>(endpoints.beneficiary.listBeneficiary.url)
}

export function useViewBeneficiaryResponse(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BeneficiaryResponse>(endpoints.beneficiary.viewBeneficiary(id).url, {
    retry: 0,
    queryFn: authQueryFnFactory(keycloak?.token),
  })
}
