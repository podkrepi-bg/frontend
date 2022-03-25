import { KeycloakInstance } from 'keycloak-js'
import { QueryClient, useQuery } from 'react-query'
import { useKeycloak } from '@react-keycloak/ssr'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { CampaignResponse, CampaignType } from 'gql/campaigns'

export function useCampaignList() {
  return useQuery<CampaignResponse[]>(endpoints.campaign.listCampaigns.url)
}

export function useCampaignTypesList() {
  return useQuery<CampaignType[]>(endpoints.campaignTypes.listCampaignTypes.url)
}

export function useViewCampaign(slug: string) {
  return useQuery<{ campaign: CampaignResponse }>(endpoints.campaign.viewCampaign(slug).url)
}

export function useViewCampaignById(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CampaignResponse>(
    endpoints.campaign.viewCampaignById(id).url,
    authQueryFnFactory<CampaignResponse>(keycloak?.token),
  )
}

export async function prefetchCampaignById(client: QueryClient, id: string, token?: string) {
  await client.prefetchQuery<CampaignResponse>(
    endpoints.campaign.viewCampaignById(id).url,
    authQueryFnFactory<CampaignResponse>(token),
  )
}

export function useCampaignDetailsPage(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CampaignResponse>(
    endpoints.campaign.viewCampaignById(id).url,
    authQueryFnFactory<CampaignResponse>(keycloak?.token),
  )
}
