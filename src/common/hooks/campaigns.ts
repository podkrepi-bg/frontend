import { useSession } from 'next-auth/react'
import { QueryClient, QueryFunction, useQuery } from '@tanstack/react-query'
import { shuffle } from 'lodash'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import {
  CampaignResponse,
  CampaignType,
  AdminCampaignResponse,
  AdminSingleCampaignResponse,
  CampaignDonationHistoryResponse,
} from 'gql/campaigns'
import { DonationStatus } from 'gql/donations.enums'
import { apiClient } from 'service/apiClient'

// NOTE: shuffling the campaigns so that each gets its fair chance to be on top row
const shuffleQueryFn: QueryFunction<CampaignResponse[]> = async ({ queryKey }) => {
  const response = await apiClient.get(queryKey.join('/'))
  return shuffle<CampaignResponse>(response.data)
}

export function useCampaignList() {
  return useQuery<CampaignResponse[]>([endpoints.campaign.listCampaigns.url], shuffleQueryFn, {
    // Add 15 minutes of cache time
    staleTime: 1000 * 60 * 15,
  })
}

export function useCampaignAdminList() {
  const { data: session } = useSession()
  return useQuery<AdminCampaignResponse[]>(
    [endpoints.campaign.listAdminCampaigns.url],
    authQueryFnFactory<AdminCampaignResponse[]>(session?.accessToken),
  )
}

export const useGetUserCampaigns = () => {
  const { data: session } = useSession()
  return useQuery<AdminCampaignResponse[]>(
    [endpoints.campaign.getUserCamapaigns.url],
    authQueryFnFactory<AdminCampaignResponse[]>(session?.accessToken),
  )
}

export function useUserDonationsCampaigns() {
  const { data: session } = useSession()
  return useQuery<AdminCampaignResponse[]>([endpoints.campaign.getUserDonatedToCampaigns.url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function useCampaignTypesList() {
  return useQuery<CampaignType[]>([endpoints.campaignTypes.listCampaignTypes.url])
}

export function useViewCampaign(slug: string) {
  return useQuery<{ campaign: CampaignResponse }>([endpoints.campaign.viewCampaign(slug).url])
}

export function useViewCampaignById(id: string) {
  const { data: session } = useSession()
  return useQuery<AdminSingleCampaignResponse>(
    [endpoints.campaign.viewCampaignById(id).url],
    authQueryFnFactory<AdminSingleCampaignResponse>(session?.accessToken),
  )
}

export async function prefetchCampaignById(client: QueryClient, id: string, token?: string) {
  await client.prefetchQuery<AdminSingleCampaignResponse>(
    [endpoints.campaign.viewCampaignById(id).url],
    authQueryFnFactory<AdminSingleCampaignResponse>(token),
  )
}

export function useCampaignDetailsPage(id: string) {
  const { data: session } = useSession()
  return useQuery<CampaignResponse>(
    [endpoints.campaign.viewCampaignById(id).url],
    authQueryFnFactory<CampaignResponse>(session?.accessToken),
  )
}

export function useCampaignDonationHistory(
  campaignId: string,
  pageindex?: number,
  pagesize?: number,
) {
  return useQuery<CampaignDonationHistoryResponse>([
    endpoints.donation.getDonations(campaignId, DonationStatus.succeeded, pageindex, pagesize).url,
  ])
}
