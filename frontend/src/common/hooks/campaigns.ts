import { useQuery } from 'react-query'

import { Campaign } from 'gql/campaigns'

export function useCampaignList() {
  return useQuery<Campaign[]>('/campaign/list')
}

export function useViewCampaign(slug: string) {
  return useQuery<{ campaign: Campaign }>(`/campaign/${slug}`)
}
