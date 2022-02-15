import { QueryFunction } from 'react-query'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import {
  SupportRequestResponse,
  SupportRequestInput,
} from 'components/support-form/helpers/support-form.types'
import { CampaignResponse, CampaignInput } from 'gql/campaigns'
import { CreateBeneficiaryInput, PersonResponse } from 'gql/person'
import { ContactRequestResponse, ContactRequestInput } from 'gql/contact'
import { CheckoutSessionInput, CheckoutSessionResponse } from 'gql/donations'
import { CountryInput, CountryResponse } from 'gql/countries'

import { endpoints } from './apiEndpoints'

export const queryFn: QueryFunction = async function ({ queryKey }) {
  const response = await apiClient.get(queryKey.join('/'))
  return await response.data
}

export const queryFnFactory = <T>(config?: AxiosRequestConfig): QueryFunction<T> =>
  async function ({ queryKey }) {
    const response = await apiClient.get(queryKey.join('/'), config)
    return await response.data
  }

export const authQueryFnFactory = <T>(token?: string): QueryFunction<T> => {
  return queryFnFactory<T>(authConfig(token))
}

export const authConfig = (token?: string): AxiosRequestConfig => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  return { headers }
}

export const createBeneficiary = async (data: CreateBeneficiaryInput) => {
  return await apiClient.post<CreateBeneficiaryInput, AxiosResponse<PersonResponse>>(
    endpoints.person.createBeneficiary.url,
    data,
  )
}

export const createContactRequest = async (data: ContactRequestInput) => {
  return await apiClient.post<ContactRequestInput, AxiosResponse<ContactRequestResponse>>(
    endpoints.support.createInfoRequest.url,
    data,
  )
}

export const createSupportRequest = async (data: SupportRequestInput) => {
  return await apiClient.post<SupportRequestInput, AxiosResponse<SupportRequestResponse>>(
    endpoints.support.createSupportRequest.url,
    data,
  )
}

export const useCreateCampaign = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CampaignInput) =>
    await apiClient.post<CampaignInput, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.createCampaign.url,
      data,
      authConfig(keycloak?.token),
    )
}

export const createCheckoutSession = async (data: CheckoutSessionInput) => {
  return await apiClient.post<CheckoutSessionInput, AxiosResponse<CheckoutSessionResponse>>(
    endpoints.donation.createCheckoutSession.url,
    data,
  )
}

export const createCountry = async (data: CountryInput) => {
  return await apiClient.post<CountryInput, AxiosResponse<CountryResponse>>(
    endpoints.country.createCountry.url,
    data,
  )
}

export const getCountry = async (id: string) => {
  return await apiClient.get<string, AxiosResponse<CountryResponse>>(
    endpoints.country.viewCountry(id).url,
  )
}

type EditCountryProp = {
  id: string
  data: CountryInput
}

export const editCountry = async ({ id, data }: EditCountryProp) => {
  return await apiClient.patch<CountryResponse, AxiosResponse<CountryResponse>>(
    endpoints.country.editCountry(id).url,
    data,
  )
}

export const deleteCountry = async (id: string) => {
  return await apiClient.delete<string, AxiosResponse<CountryResponse>>(
    endpoints.country.deleteCountry(id).url,
  )
}
