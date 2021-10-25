import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { CampaignResponse, CampaignType } from 'gql/campaigns'

export function useCampaignList() {
  return useQuery<CampaignResponse[]>(endpoints.campaign.listCampaigns.url)
}

export function useCampaignTypesList() {
  return useQuery<CampaignType[]>(endpoints.campaignType.listCampaignTypes.url)
}

export function useViewCampaign(slug: string) {
  return useQuery<{ campaign: CampaignResponse }>(endpoints.campaign.viewCampaign(slug).url)
}
