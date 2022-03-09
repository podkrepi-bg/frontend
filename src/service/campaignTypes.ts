import { AxiosResponse } from 'axios'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { endpoints } from './apiEndpoints'
import { authConfig, authQueryFnFactory } from './restRequests'
import { CampaignTypeFormData, CampaignTypesResponse, DeleteMany } from 'gql/campaign-types'
import { QueryClient, useQuery } from 'react-query'
import { apiClient } from './apiClient'

export const useCampaignTypesList = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return useQuery(
    endpoints.campaignTypes.listCampaignTypes.url,
    authQueryFnFactory<CampaignTypesResponse[]>(keycloak?.token),
  )
}

export const useCampaignType = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery(
    endpoints.campaignTypes.viewCampaignType(id).url,
    authQueryFnFactory<CampaignTypesResponse>(keycloak?.token),
    { staleTime: 5 },
  )
}

export const useCreateCampaignType = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return async (vals: CampaignTypeFormData) => {
    return await apiClient.post(
      endpoints.campaignTypes.createCampaignType.url,
      vals,
      authConfig(keycloak?.token),
    )
  }
}

export const useEditCampaignType = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return async (vals: CampaignTypeFormData) => {
    return await apiClient.put(
      endpoints.campaignTypes.editCampaignType(id).url,
      vals,
      authConfig(keycloak?.token),
    )
  }
}

export const useRemoveCampaignType = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return async (id: string) => {
    return await apiClient.delete(
      endpoints.campaignTypes.removeCampaignType(id).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useRemoveManyCampaignTypes(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<DeleteMany, AxiosResponse<CampaignTypesResponse[]>>(
      endpoints.campaignTypes.removeMany.url,
      { ids: idsToDelete },
      authConfig(keycloak?.token),
    )
  }
}

export async function prefetchCampaignTypeById(client: QueryClient, slug: string, token?: string) {
  await client.prefetchQuery<CampaignTypesResponse>(
    endpoints.campaignTypes.viewCampaignType(slug).url,
    authQueryFnFactory<CampaignTypesResponse>(token),
  )
}

export async function prefetchCampaignTypesList(client: QueryClient, token?: string) {
  await client.prefetchQuery<CampaignTypesResponse[]>(
    endpoints.campaignTypes.listCampaignTypes.url,
    authQueryFnFactory<CampaignTypesResponse[]>(token),
  )
}
