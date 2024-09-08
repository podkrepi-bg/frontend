import { AxiosError, AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'

import { useQuery } from '@tanstack/react-query'
import {
  CampaignApplicationExisting,
  CreateCampaignApplicationInput,
  CreateCampaignApplicationResponse,
  UploadCampaignApplicationFilesRequest,
  UploadCampaignApplicationFilesResponse,
} from 'gql/campaign-applications'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { authConfig, authQueryFnFactory } from 'service/restRequests'

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

export const useDeleteCampaignApplicationFile = () => {
  const { data: session } = useSession()
  return async (id: string) =>
    await apiClient.delete<UploadCampaignApplicationFilesRequest>(
      endpoints.campaignApplication.deleteFile(id).url,
      authConfig(session?.accessToken),
    )
}

export function useViewCampaignApplicationCached(id: string, cacheFor = 60 * 1000) {
  const { data } = useSession()
  return useQuery<CampaignApplicationExisting, AxiosError>(
    [endpoints.campaignApplication.view(id).url],
    authQueryFnFactory<CampaignApplicationExisting>(data?.accessToken),
    {
      cacheTime: cacheFor,
    },
  )
}

export const useUpdateCampaignApplication = () => {
  const { data: session } = useSession()
  return async ([data, id]: [CreateCampaignApplicationInput, string]) =>
    await apiClient.patch<
      CreateCampaignApplicationInput,
      AxiosResponse<CreateCampaignApplicationResponse>
    >(endpoints.campaignApplication.update(id).url, data, authConfig(session?.accessToken))
}
