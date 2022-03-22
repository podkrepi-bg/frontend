import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import {
  CheckoutSessionInput,
  CheckoutSessionResponse,
  DonationInput,
  DonationResponse,
} from 'gql/donations'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { authConfig } from 'service/restRequests'

export const createCheckoutSession = async (data: CheckoutSessionInput) => {
  return await apiClient.post<CheckoutSessionInput, AxiosResponse<CheckoutSessionResponse>>(
    endpoints.donation.createCheckoutSession.url,
    data,
  )
}

export function useCreateDonation() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: DonationInput) => {
    return await apiClient.post<DonationResponse, AxiosResponse<DonationResponse>>(
      endpoints.donation.createDonation.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useEditDonation(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: DonationInput) => {
    return await apiClient.patch<DonationResponse, AxiosResponse<DonationResponse>>(
      endpoints.donation.editDonation(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteDonation(ids: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<DonationResponse, AxiosResponse<DonationResponse>>(
      endpoints.donation.deleteDonation.url,
      ids,
      authConfig(keycloak?.token),
    )
  }
}
