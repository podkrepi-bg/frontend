import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { endpoints } from './apiEndpoints'
import { authQueryFnFactory } from './restRequests'
import { BeneficiaryFormData, BeneficiaryType } from 'gql/beneficiary'
import { useQuery } from 'react-query'
import { apiClient } from './apiClient'

export const useBeneficiariesList = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery(
    endpoints.beneficiary.listBeneficiary.url,
    authQueryFnFactory<BeneficiaryType[]>(keycloak?.token),
  )
}

export const useViewBeneficiary = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery(
    endpoints.beneficiary.viewBeneficiary(id).url,
    authQueryFnFactory<BeneficiaryType>(keycloak?.token),
  )
}

export const useCreateBeneficiary = () => {
  return async (vals: BeneficiaryFormData) => {
    return await apiClient.post(endpoints.beneficiary.createBeneficiary.url, vals)
  }
}

export const useEditBeneficiary = (id: string) => {
  return async (vals: BeneficiaryFormData) => {
    return await apiClient.put(endpoints.beneficiary.editBeneficiary(id).url, vals)
  }
}
