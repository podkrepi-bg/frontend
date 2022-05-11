import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

import {
  CampaignReportFile,
  CampaignReportResponse,
} from 'components/irregularity-report/helpers/report.types'

export function useCampaignReportList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CampaignReportResponse[]>(
    endpoints.support.campaignReportsList.url,
    authQueryFnFactory<CampaignReportResponse[]>(keycloak?.token),
  )
}

export function useCampaignReport(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CampaignReportResponse>(
    endpoints.support.viewCampaignReport(id).url,
    authQueryFnFactory<CampaignReportResponse>(keycloak?.token),
  )
}

export function useCampaignReportFilesList(campaignReportId: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CampaignReportFile[]>(
    endpoints.campaignReportFile.listCampaignReportFiles(campaignReportId).url,
    authQueryFnFactory<CampaignReportFile[]>(keycloak?.token),
  )
}
