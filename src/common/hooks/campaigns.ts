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
import { useCurrentPerson } from 'common/util/useCurrentPerson'
import { isAdmin } from 'common/util/roles'

// NOTE: shuffling the campaigns so that each gets its fair chance to be on top row
export const campaignsOrderQueryFunction: QueryFunction<CampaignResponse[]> = async ({
  queryKey,
}) => {
  const response = await apiClient.get(queryKey.join('/'))
  // Put the campaigns in 2 arrays, one for active and one for inactive
  const activeCampaigns: CampaignResponse[] = []
  const inactiveCampaigns: CampaignResponse[] = []
  response.data.forEach((campaign: CampaignResponse) => {
    if (campaign.state === 'active') {
      activeCampaigns.push(campaign)
    } else {
      inactiveCampaigns.push(campaign)
    }
  })
  // Shuffle the active campaigns
  const shuffledActiveCampaigns = shuffle(activeCampaigns)
  // Shuffle the inactive campaigns
  const shuffledInactiveCampaigns = shuffle(inactiveCampaigns)
  // Concatenate the two arrays
  return shuffledActiveCampaigns.concat(shuffledInactiveCampaigns)
}

export function useCampaignList() {
  return useQuery<CampaignResponse[]>(
    [endpoints.campaign.listCampaigns.url],
    campaignsOrderQueryFunction,
    {
      // Add 15 minutes of cache time
      staleTime: 1000 * 60 * 15,
    },
  )
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
    [endpoints.campaign.getUserDonatedToCampaigns.url],
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
  campaignId?: string,
  pageindex?: number,
  pagesize?: number,
) {
  return useQuery<CampaignDonationHistoryResponse>([
    endpoints.donation.getDonations(DonationStatus.succeeded, campaignId, pageindex, pagesize).url,
  ])
}

export function useCanEditCampaign(slug: string) {
  const { data: session } = useSession()

  const { data: userData } = useCurrentPerson()
  const { data: campaignData } = useViewCampaign(slug)

  if (!session || !session.user) {
    return false
  }

  if (!userData || !campaignData || !userData.user) {
    return false
  }

  const canEdit =
    userData.user.id === campaignData.campaign.organizer?.person.id ||
    session?.user?.realm_access?.roles?.includes('podkrepi-admin') ||
    isAdmin(session)

  return canEdit
}
