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

export function useEditCampaign(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CampaignInput) => {
    return await apiClient.patch<CampaignResponse, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.editCampaign(slug).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const useDeleteCampaign = async ({ id }: { id: string }) => {
  return await apiClient.delete<null>(endpoints.city.deleteCity(id).url)
}

export function useDeleteCampaignById(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<null>(
      endpoints.campaign.deleteCampaign(id).url,
      authConfig(keycloak?.token),
    )
  }
}

export const useUploadCampaignFiles = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: {
    files: File[]
    id: string
    filesRole: { file: string; role: string }[]
  }) => {
    const formData = new FormData()
    data.files.forEach((file: File) => {
      formData.append('file', file)
    })
    formData.append('filesRole', JSON.stringify(data.filesRole))
    return await apiClient.post<FormData, AxiosResponse<CampaignUploadImage[]>>(
      endpoints.campaign.uploadFile(data.id).url,
      formData,
      {
        headers: {
          ...authConfig(keycloak?.token).headers,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }
}
