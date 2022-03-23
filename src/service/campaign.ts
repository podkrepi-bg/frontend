import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { CampaignResponse, CampaignInput, CampaignUploadImage } from 'gql/campaigns'

export const useCreateCampaign = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CampaignInput) =>
    await apiClient.post<CampaignInput, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.createCampaign.url,
      data,
      authConfig(keycloak?.token),
    )
}

export const useUploadCampaignFiles = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: { files: File[]; id: string }) => {
    const formData = new FormData()
    data.files.forEach((file: File) => {
      formData.append('file', file)
    })
    return await apiClient.post<FormData, AxiosResponse<CampaignUploadImage[]>>(
      endpoints.campaign.uploadFile(data.id).url,
      formData,
      {
        headers: { ...authConfig(keycloak?.token).headers, 'Content-Type': 'multipart/form-data' },
      },
    )
  }
}
