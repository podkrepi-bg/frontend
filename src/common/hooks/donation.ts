import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { DonationPrice, DonationResponse, UserDonationResult } from 'gql/donations'
import { CampaignDonationHistoryResponse } from 'gql/campaigns'
import { FilterData, PaginationData } from 'gql/types'

export function usePriceList() {
  return useQuery<DonationPrice[]>([endpoints.donation.prices.url])
}
export function useSinglePriceList() {
  return useQuery<DonationPrice[]>([endpoints.donation.singlePrices.url])
}

export function useDonationsList(
  id?: string,
  paginationData?: PaginationData,
  filterData?: FilterData,
  searchData?: string,
) {
  const { data: session } = useSession()
  return useQuery<CampaignDonationHistoryResponse>(
    [endpoints.donation.donationsList(id, paginationData, filterData, searchData).url],
    {
      queryFn: authQueryFnFactory(session?.accessToken),
    },
  )
}

export function useCampaignDonationsList(id: string) {
  return useQuery<DonationResponse[]>([endpoints.campaign.getDonations(id).url])
}

export async function prefetchDonationsList(client: QueryClient) {
  await client.prefetchQuery<DonationResponse[]>([endpoints.donation.donationsList().url])
}

export function useDonation(id: string) {
  return useQuery<DonationResponse>([endpoints.donation.getDonation(id).url])
}

export async function prefetchDonationById(client: QueryClient, id: string) {
  await client.prefetchQuery<DonationResponse>([endpoints.donation.getDonation(id).url])
}
export function useUserDonations() {
  const { data: session } = useSession()
  return useQuery<UserDonationResult>([endpoints.donation.userDonations.url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}
