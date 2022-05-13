import { AxiosResponse } from 'axios'

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
import { useSession } from 'next-auth/react'

export const createCampaignReport = async (data: CampaignReportInput) => {
  return await apiClient.post<CampaignReportInput, AxiosResponse<CampaignReportResponse>>(
    endpoints.campaignReport.createCampaignReport.url,
    data,
  )
}

export const editCampaignReport = (id: string) => {
  const { data: session } = useSession()

  return async (data: CampaignReportEditInput) => {
    return await apiClient.put<CampaignReportEditInput, AxiosResponse<CampaignReportResponse>>(
      endpoints.campaignReport.editCampaignReport(id).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const deleteCampaignReport = (id: string) => {
  const { data: session } = useSession()

  return async () => {
    return await apiClient.delete<CampaignReportResponse, AxiosResponse<CampaignReportResponse>>(
      endpoints.campaignReport.removeCampaignReport(id).url,
      authConfig(session?.accessToken),
    )
  }
}

export const uploadCampaignReportFiles = () => {
  const { data: session } = useSession()

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
          ...authConfig(session?.accessToken).headers,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }
}

export const deleteCampaignReportFile = (id: string) => {
  const { data: session } = useSession()

  return async () => {
    return await apiClient.delete<CampaignReportFile, AxiosResponse<CampaignReportFile>>(
      endpoints.campaignReportFile.deleteCampaignReportFile(id).url,
      authConfig(session?.accessToken),
    )
  }
}
