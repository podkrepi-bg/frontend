import { useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { CampaignTypesResponse } from 'gql/campaign-types'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'

export function useCampaignTypesList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
}

export function useViewCampaignType(slug: string) {
  return useQuery<CampaignTypesResponse>(endpoints.campaignTypes.viewCampaignType(slug).url)
}

export function useDeleteCampaignType(slug: string) {
  return useQuery<CampaignTypesResponse>(endpoints.campaignTypes.deleteCampaignType(slug).url)
}
