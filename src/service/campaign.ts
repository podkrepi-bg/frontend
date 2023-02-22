import { useSession } from 'next-auth/react'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { UploadCampaignFiles } from 'components/common/campaign-file/roles'
import { CampaignResponse, CampaignInput, CampaignUploadImage, CampaignFile } from 'gql/campaigns'
import { Session } from 'next-auth'

export const useCreateCampaign = () => {
  const { data: session } = useSession()
  return async (data: CampaignInput) =>
    await apiClient.post<CampaignInput, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.createCampaign.url,
      data,
      authConfig(session?.accessToken),
    )
}

export function useEditCampaign(slug: string) {
  const { data: session } = useSession()
  return async (data: CampaignInput) => {
    return await apiClient.patch<CampaignResponse, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.editCampaign(slug).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const useDeleteCampaign = async ({ id }: { id: string }) => {
  return await apiClient.delete<null>(endpoints.city.deleteCity(id).url)
}

export function useDeleteCampaignById(id: string) {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<null>(
      endpoints.campaign.deleteCampaign(id).url,
      authConfig(session?.accessToken),
    )
  }
}

export const useUploadCampaignFiles = () => {
  const { data: session } = useSession()
  return async ({ files, roles: filesRole, campaignId }: UploadCampaignFiles) => {
    const formData = new FormData()
    files.forEach((file: File) => {
      formData.append('file', file)
    })
    filesRole.forEach((fileRole) => {
      formData.append('roles', fileRole.role)
    })
    return await apiClient.post<FormData, AxiosResponse<CampaignUploadImage[]>>(
      endpoints.campaign.uploadFile(campaignId).url,
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

export const downloadCampaignFile = (id: string, session: Session | null) => {
  return apiClient(endpoints.campaign.downloadFile(id).url, {
    ...authConfig(session?.accessToken),
    responseType: 'blob',
  })
}

export const deleteCampaignFile = (id: string) => {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<CampaignFile, AxiosResponse<CampaignFile>>(
      endpoints.campaign.deleteFile(id).url,
      authConfig(session?.accessToken),
    )
  }
}
