import { useTranslation } from 'react-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'

import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { endpoints } from 'service/apiEndpoints'
import { createCheckoutSession } from 'service/restRequests/donation'
import {
  CheckoutSessionInput,
  CheckoutSessionResponse,
  DonationPrice,
  UserDonation,
} from 'gql/donations'
import { useKeycloak } from '@react-keycloak/ssr'
import { authQueryFnFactory } from 'service/restRequests'
import { KeycloakInstance } from 'keycloak-js'

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
export function useUserDonations() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<UserDonation[]>(endpoints.account.donations.url, {
    queryFn: authQueryFnFactory(keycloak?.token),
  })
}
