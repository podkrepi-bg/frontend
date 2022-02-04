import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { CampaignTypesResponse } from 'gql/campaign-types'

export function useCampaignTypesList() {
  return useQuery<CampaignTypesResponse[]>(endpoints.campaignTypes.listCampaignTypes.url)
}

export function useViewCampaignType(slug: string) {
  return useQuery<CampaignTypesResponse>(endpoints.campaignTypes.viewCampaignType(slug).url)
}

export function useDeleteCampaignType(slug: string) {
  return useQuery<CampaignTypesResponse>(endpoints.campaignTypes.deleteCampaignType(slug).url)
}
