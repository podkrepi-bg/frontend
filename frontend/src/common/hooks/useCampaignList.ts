import { useQuery } from 'react-query'

import { Campaign } from 'gql/campaigns'

export default function useCampaignList() {
  return useQuery<Campaign[]>('/campaign/list')
}
