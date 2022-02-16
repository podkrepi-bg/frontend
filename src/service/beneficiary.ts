import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'

import { endpoints } from './apiEndpoints'
import { authConfig } from './restRequests'
import { BeneficiaryType } from 'gql/beneficiary'
import { useQuery } from 'react-query'

export const useBeneficiariesList = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery({
    queryFn: async () => {
      return await apiClient.get<BeneficiaryType[], AxiosResponse<BeneficiaryType[]>>(
        endpoints.beneficiary.listBeneficiary.url,
        authConfig(keycloak?.token),
      )
    },
  })
}

export const useViewBeneficiary = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  console.log(endpoints.beneficiary.viewBeneficiary(id).url)
  return useQuery({
    queryFn: async () => {
      return await apiClient.get<BeneficiaryType, AxiosResponse<BeneficiaryType>>(
        endpoints.beneficiary.viewBeneficiary(id).url,
        authConfig(keycloak?.token),
      )
    },
  })
}
