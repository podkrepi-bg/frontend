import { useQuery } from 'react-query'

import { CampaignResponse, CampaignType } from 'gql/campaigns'

export function useCampaignList() {
  return useQuery<CampaignResponse[]>('/campaign/list')
}

export function useCampaignTypesList() {
  return useQuery<CampaignType[]>('/campaign-type/list')
}

export function useViewCampaign(slug: string) {
  return useQuery<{ campaign: CampaignResponse }>(`/campaign/${slug}`)
}
