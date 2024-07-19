import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import {
  DonationPrice,
  DonationResponse,
  UserDonationResult,
  PaymentAdminResponse,
  TPaymentResponse,
  TotalDonatedMoneyResponse,
  DonorsCountResult,
} from 'gql/donations'
import { CampaignDonationHistoryResponse } from 'gql/campaigns'
import { FilterData, PaginationData } from 'gql/types'

export function usePriceList() {
  return useQuery<DonationPrice[]>([endpoints.donation.prices.url])
}
export function useSinglePriceList() {
  return useQuery<DonationPrice[]>([endpoints.donation.singlePrices.url])
}

export function useDonationsList(
  paymentId?: string,
  campaignId?: string,
  paginationData?: PaginationData,
  filterData?: FilterData,
  searchData?: string,
) {
  const { data: session } = useSession()
  return useQuery<CampaignDonationHistoryResponse>(
    [
      endpoints.donation.donationsList(
        paymentId,
        campaignId,
        paginationData,
        filterData,
        searchData,
      ).url,
    ],
    {
      queryFn: authQueryFnFactory(session?.accessToken),
    },
  )
}

export function usePaymentsList(
  paymentId?: string,
  campaignId?: string,
  paginationData?: PaginationData,
  filterData?: FilterData,
  searchData?: string,
) {
  const { data: session } = useSession()
  return useQuery<PaymentAdminResponse>(
    [endpoints.payments.list(paymentId, campaignId, paginationData, filterData, searchData).url],
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

export function useGetPayment(id: string) {
  const { data: session } = useSession()
  return useQuery<TPaymentResponse>([endpoints.payments.getPayment(id).url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export async function prefetchDonationById(client: QueryClient, id: string) {
  await client.prefetchQuery<DonationResponse>([endpoints.donation.getDonation(id).url])
}

export function useFindDonationById(id: string) {
  return useQuery<Pick<DonationResponse, 'id'>>([
    endpoints.donation.getDonationByPaymentIntent(id).url,
  ])
}
export function useUserDonations() {
  const { data: session } = useSession()
  return useQuery<UserDonationResult>([endpoints.donation.userDonations.url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function getTotalDonatedMoney() {
  return useQuery<TotalDonatedMoneyResponse>([endpoints.donation.getTotalDonatedMoney.url])
}

export function useDonatedUsersCount() {
  return useQuery<DonorsCountResult>([endpoints.donation.getDonorsCount.url])
}
