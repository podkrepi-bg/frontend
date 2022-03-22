import { QueryClient, useQuery } from 'react-query'
import { useKeycloak } from '@react-keycloak/ssr'

import { endpoints } from 'service/apiEndpoints'
import { CampaignResponse, CampaignType, CampaignFormData } from 'gql/campaigns'
import { authQueryFnFactory } from 'service/restRequests'
import { KeycloakInstance } from 'keycloak-js'

export function useCampaignList() {
  return useQuery<CampaignResponse[]>(endpoints.campaign.listCampaigns.url)
}

export function useCampaignTypesList() {
  return useQuery<CampaignType[]>(endpoints.campaignTypes.listCampaignTypes.url)
}

export function useViewCampaign(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CampaignResponse>(
    endpoints.campaign.viewCampaign(id).url,
    authQueryFnFactory<CampaignResponse>(keycloak?.token),
  )
}

export function useCampaign(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CampaignFormData>(
    endpoints.campaign.viewCampaign(id).url,
    authQueryFnFactory<CampaignFormData>(keycloak?.token),
  )
}

export async function prefetchCampaignById(client: QueryClient, id: string, token?: string) {
  await client.prefetchQuery<CampaignResponse>(
    endpoints.campaign.viewCampaign(id).url,
    authQueryFnFactory<CampaignResponse>(token),
  )
}

export function useCampaignDetailsPage(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CampaignResponse>(
    endpoints.campaign.viewCampaign(id).url,
    authQueryFnFactory<CampaignResponse>(keycloak?.token),
  )
}
