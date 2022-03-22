import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { CampaignResponse, CampaignInput } from 'gql/campaigns'
import { MutationFunction } from 'react-query'

export const useCreateCampaign = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CampaignInput) =>
    await apiClient.post<CampaignInput, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.createCampaign.url,
      data,
      authConfig(keycloak?.token),
    )
}
export function useEditCampaign(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CampaignInput) => {
    return await apiClient.patch<CampaignResponse, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.editCampaign(slug).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const useDeleteCampaign: MutationFunction<AxiosResponse<null>, { id: string }> = async ({
  id,
}: {
  id: string
}) => {
  return await apiClient.delete<null>(endpoints.city.deleteCity(id).url)
}

export function useDeleteCampaignById(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<CampaignResponse, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.deleteCampaign(id).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteCampaignBySlug(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<CampaignResponse, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.deleteCampaign(slug).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteManyCampaigns(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<CampaignResponse, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.deleteCampaigns.url,
      idsToDelete,
      authConfig(keycloak?.token),
    )
  }
}
