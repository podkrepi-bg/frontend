import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

import {
  CampaignReportFile,
  CampaignReportResponse,
} from 'components/irregularity-report/helpers/report.types'

export function useCampaignReportList() {
  const { data: session } = useSession()

  return useQuery<CampaignReportResponse[]>(
    endpoints.campaignReport.campaignReportsList.url,
    authQueryFnFactory<CampaignReportResponse[]>(session?.accessToken),
  )
}

export function useCampaignReport(id: string) {
  const { data: session } = useSession()

  return useQuery<CampaignReportResponse>(
    endpoints.campaignReport.viewCampaignReport(id).url,
    authQueryFnFactory<CampaignReportResponse>(session?.accessToken),
  )
}

export function useCampaignReportFilesList(campaignReportId: string) {
  const { data: session } = useSession()

  return useQuery<CampaignReportFile[]>(
    endpoints.campaignReportFile.listCampaignReportFiles(campaignReportId).url,
    authQueryFnFactory<CampaignReportFile[]>(session?.accessToken),
  )
}
