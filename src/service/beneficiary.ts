import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import {
  BeneficiaryFormData,
  BeneficiaryListResponse,
  ViewBeneficiaryResponse,
} from 'gql/beneficiary'

import { apiClient } from './apiClient'
import { endpoints } from './apiEndpoints'
import { authConfig, authQueryFnFactory } from './restRequests'

export const useBeneficiariesList = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery(
    endpoints.beneficiary.listBeneficiary.url,
    authQueryFnFactory<BeneficiaryListResponse[]>(keycloak?.token),
  )
}

export const useViewBeneficiary = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery(
    endpoints.beneficiary.viewBeneficiary(id).url,
    authQueryFnFactory<ViewBeneficiaryResponse>(keycloak?.token),
  )
}

export const useCreateBeneficiary = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (values: BeneficiaryFormData) => {
    return await apiClient.post(
      endpoints.beneficiary.createBeneficiary.url,
      values,
      authConfig(keycloak?.token),
    )
  }
}

export const useEditBeneficiary = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return async (vals: BeneficiaryFormData) => {
    return await apiClient.put(
      endpoints.beneficiary.editBeneficiary(id).url,
      vals,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteBeneficiary(slug: string) {
  return useQuery<null>(endpoints.beneficiary.removeBeneficiary(slug).url)
}

export const useRemoveBeneficiary = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return async (id: string) => {
    return await apiClient.delete(
      endpoints.beneficiary.removeBeneficiary(id).url,
      authConfig(keycloak?.token),
    )
  }
}

export async function prefetchBeneficiaryById(client: QueryClient, slug: string, token?: string) {
  await client.prefetchQuery<BeneficiaryListResponse>(
    endpoints.beneficiary.viewBeneficiary(slug).url,
    authQueryFnFactory<BeneficiaryListResponse>(token),
  )
}

export async function prefetchBeneficiariesList(client: QueryClient, token?: string) {
  await client.prefetchQuery<BeneficiaryListResponse[]>(
    endpoints.beneficiary.listBeneficiary.url,
    authQueryFnFactory<BeneficiaryListResponse[]>(token),
  )
}
