import { useQuery } from 'react-query'

import { Campaign, CampaignType } from 'gql/campaigns'

export function useCampaignList() {
  return useQuery<Campaign[]>('/campaign/list')
}

export function useCampaignTypesList() {
  return useQuery<CampaignType[]>('/campaign-type/list')
}

export function useViewCampaign(slug: string) {
  return useQuery<{ campaign: Campaign }>(`/campaign/${slug}`)
}
