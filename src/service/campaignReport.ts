import { AxiosResponse } from 'axios'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { authConfig } from './restRequests'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'

import {
  CampaignReportEditInput,
  CampaignReportFile,
  CampaignReportInput,
  CampaignReportResponse,
  CampaignReportUploadImage,
  UploadCampaignReportFiles,
} from 'components/irregularity-report/helpers/report.types'

export const createCampaignReport = async (data: CampaignReportInput) => {
  return await apiClient.post<CampaignReportInput, AxiosResponse<CampaignReportResponse>>(
    endpoints.support.createCampaignReport.url,
    data,
  )
}

export const editCampaignReport = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CampaignReportEditInput) => {
    return await apiClient.put<CampaignReportEditInput, AxiosResponse<CampaignReportResponse>>(
      endpoints.support.editCampaignReport(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const deleteCampaignReport = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<CampaignReportResponse, AxiosResponse<CampaignReportResponse>>(
      endpoints.support.removeCampaignReport(id).url,
      authConfig(keycloak?.token),
    )
  }
}

export const uploadCampaignReportFiles = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async ({ files, campaignReportId }: UploadCampaignReportFiles) => {
    const formData = new FormData()
    files.forEach((file: File) => {
      formData.append('file', file)
    })
    return await apiClient.post<FormData, AxiosResponse<CampaignReportUploadImage[]>>(
      endpoints.campaignReportFile.uploadCampaignReportFile(campaignReportId).url,
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

export const deleteCampaignReportFile = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<CampaignReportFile, AxiosResponse<CampaignReportFile>>(
      endpoints.campaignReportFile.deleteCampaignReportFile(id).url,
      authConfig(keycloak?.token),
    )
  }
}
