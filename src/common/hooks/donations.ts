import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { useTranslation } from 'react-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { QueryClient, useMutation, useQuery } from 'react-query'

import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { createCheckoutSession } from 'service/restRequests/donation'
import {
  CheckoutSessionInput,
  CheckoutSessionResponse,
  DonationPrice,
  DonationResponse,
} from 'gql/donations'

export function usePriceList() {
  return useQuery<DonationPrice[]>(endpoints.donation.prices.url)
}
export function useSinglePriceList() {
  return useQuery<DonationPrice[]>(endpoints.donation.singlePrices.url)
}
export function useRecurringPriceList() {
  return useQuery<DonationPrice[]>(endpoints.donation.recurringPrices.url)
}
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
  })
  return mutation
}

export function useDonationsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<DonationResponse[]>(
    endpoints.donation.donationsList.url,
    authQueryFnFactory<DonationResponse[]>(keycloak?.token),
  )
}

export async function prefetchDonationsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<DonationResponse[]>(
    endpoints.donation.donationsList.url,
    authQueryFnFactory<DonationResponse[]>(token),
  )
}

export function useDonation(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<DonationResponse>(
    endpoints.donation.getDonation(id).url,
    authQueryFnFactory<DonationResponse>(keycloak?.token),
  )
}

export async function prefetchDonationById(client: QueryClient, id: string, token?: string) {
  await client.prefetchQuery<DonationResponse>(
    endpoints.donation.getDonation(id).url,
    authQueryFnFactory<DonationResponse>(token),
  )
}
