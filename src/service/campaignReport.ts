import { AxiosResponse } from 'axios'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { authConfig } from './restRequests'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'

import {
  CampaignReportInput,
  CampaignReportResponse,
} from 'components/irregularity-report/helpers/report.types'

export const createCampaignReport = async (data: CampaignReportInput) => {
  return await apiClient.post<CampaignReportInput, AxiosResponse<CampaignReportResponse>>(
    endpoints.support.createCampaignReport.url,
    data,
  )
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
