import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'

import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { endpoints } from 'service/apiEndpoints'
import { authConfig, authQueryFnFactory } from 'service/restRequests'
import {
  CheckoutSessionInput,
  CheckoutSessionResponse,
  DonationResponse,
  DonorsCountResult,
  PaymentAdminResponse,
  StripeChargeResponse,
  TPaymentResponse,
  TotalDonatedMoneyResponse,
  UserDonationResult,
} from 'gql/donations'
import { createCheckoutSession } from 'service/donation'
import { CampaignDonationHistoryResponse } from 'gql/campaigns'
import { FilterData, PaginationData } from 'gql/types'

export function useDonationSession() {
  const { t } = useTranslation()
  const mutation = useMutation<
    AxiosResponse<CheckoutSessionResponse>,
    AxiosError<ApiErrors>,
    CheckoutSessionInput
  >({
    mutationFn: createCheckoutSession,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
    retry(failureCount) {
      if (failureCount < 4) {
        return true
      }
      return false
    },
    retryDelay: 1000,
  })
  return mutation
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
  return useQuery<TPaymentResponse>([endpoints.payments.getPayment(id).url])
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

export function getTotalDonatedMoney() {
  return useQuery<TotalDonatedMoneyResponse>([endpoints.donation.getTotalDonatedMoney.url])
}

export function useDonatedUsersCount() {
  return useQuery<DonorsCountResult>([endpoints.donation.getDonorsCount.url])
}

export function useGetStripeChargeFromPID(stripeId: string) {
  const { data: session } = useSession()
  return useQuery<StripeChargeResponse>(
    [endpoints.payments.referenceStripeWithInternal(stripeId).url],
    { queryFn: authQueryFnFactory(session?.accessToken) },
  )
}
