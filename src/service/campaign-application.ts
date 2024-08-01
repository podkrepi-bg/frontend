import { AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { authConfig } from 'service/restRequests'
import {
  CreateCampaignApplicationInput,
  CreateCampaignApplicationResponse,
} from 'gql/campaign-applications'

export const useCreateCampaignApplication = () => {
  const { data: session } = useSession()
  return async (data: CreateCampaignApplicationInput) =>
    await apiClient.post<
      CreateCampaignApplicationInput,
      AxiosResponse<CreateCampaignApplicationResponse>
    >(endpoints.campaignApplication.create.url, data, authConfig(session?.accessToken))
}
