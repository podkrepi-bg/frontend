import { AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'

import {
  CreateCampaignApplicationInput,
  CreateCampaignApplicationResponse,
  UploadCampaignApplicationFilesRequest,
  UploadCampaignApplicationFilesResponse,
} from 'gql/campaign-applications'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { authConfig } from 'service/restRequests'

export const useCreateCampaignApplication = () => {
  const { data: session } = useSession()
  return async (data: CreateCampaignApplicationInput) =>
    await apiClient.post<
      CreateCampaignApplicationInput,
      AxiosResponse<CreateCampaignApplicationResponse>
    >(endpoints.campaignApplication.create.url, data, authConfig(session?.accessToken))
}

export const useUploadCampaignApplicationFiles = () => {
  const { data: session } = useSession()
  return async ({ files, campaignApplicationId }: UploadCampaignApplicationFilesRequest) => {
    const formData = new FormData()
    files.forEach((file: File) => {
      formData.append('file', file)
    })
    return await apiClient.post<FormData, AxiosResponse<UploadCampaignApplicationFilesResponse>>(
      endpoints.campaignApplication.uploadFile(campaignApplicationId).url,
      formData,
      {
        headers: {
          ...authConfig(session?.accessToken).headers,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }
}
