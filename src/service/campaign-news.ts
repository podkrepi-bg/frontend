import { useSession } from 'next-auth/react'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { CampaignNewsFile, CampaignNewsInput, CampaignNewsResponse } from 'gql/campaign-news'
import { Session } from 'next-auth'
import { UploadCampaignNewsFiles } from 'components/common/campaign-file/roles'
import { CampaignUploadImage } from 'gql/campaigns'

export const useCreateCampaignNews = () => {
  const { data: session } = useSession()
  return async (data: CampaignNewsInput) =>
    await apiClient.post<CampaignNewsInput, AxiosResponse<CampaignNewsResponse>>(
      endpoints.campaignNews.createNewsArticle.url,
      data,
      authConfig(session?.accessToken),
    )
}

export const useEditNewsArticle = (id: string) => {
    const {data: session} = useSession()
    return async(data: CampaignNewsInput) => {
       return await apiClient.put<CampaignNewsInput, AxiosResponse<CampaignNewsResponse>>(
            endpoints.campaignNews.editNewsArticle(id).url,
            data,
            authConfig(session?.accessToken)
        )
    }
}


export const useUploadCampaignNewsFiles = () => {
  const { data: session } = useSession()
  return async ({ files, roles: filesRole, articleId }: UploadCampaignNewsFiles) => {
    const formData = new FormData()
    files.forEach((file: File) => {
      formData.append('file', file)
    })
    filesRole.forEach((fileRole) => {
      formData.append('roles', fileRole.role)
    })
    return await apiClient.post<FormData, AxiosResponse<CampaignUploadImage[]>>(
      endpoints.campaignNews.uploadFile(articleId).url,
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

export const downloadCampaignNewsFile = (id: string, session: Session | null) => {
  return apiClient(endpoints.campaignNews.downloadFile(id).url, {
    ...authConfig(session?.accessToken),
    responseType: 'blob',
  })
}

export const deleteCampaignNewsFile = (id: string) => {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<CampaignNewsFile, AxiosResponse<CampaignNewsFile>>(
      endpoints.campaignNews.deleteFile(id).url,
      authConfig(session?.accessToken),
    )
  }
}