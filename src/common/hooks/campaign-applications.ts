import { useQuery } from '@tanstack/react-query'
import { CampaignApplication } from 'gql/campaign-applications'
import { useSession } from 'next-auth/react'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

export function useCampaignApplicationsAdminList() {
  const { data: session } = useSession()
  return useQuery<CampaignApplication[]>(
    [endpoints.campaignApplications.listAllAdmin.url],
    authQueryFnFactory<CampaignApplication[]>(session?.accessToken),
  )
}
