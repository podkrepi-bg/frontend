import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { MutationFunction, QueryFunction } from 'react-query'

import { apiClient } from 'service/apiClient'
import {
  SupportRequestResponse,
  SupportRequestInput,
} from 'components/support-form/helpers/support-form.types'
import { ContactRequestResponse, ContactRequestInput } from 'gql/contact'
import { CampaignResponse, CampaignInput } from 'gql/campaigns'

import { endpoints } from './apiEndpoints'
import { CheckoutSessionInput, CheckoutSessionResponse } from 'gql/donations'
import { CreateBeneficiaryInput, PersonResponse } from 'gql/person'
import { CountryInput, CountryResponse } from 'gql/countries'

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
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  return queryFnFactory<T>({ headers })
}

export const createBeneficiary: MutationFunction<
  AxiosResponse<PersonResponse>,
  CreateBeneficiaryInput
> = async (data: CreateBeneficiaryInput) => {
  return await apiClient.post<CreateBeneficiaryInput, AxiosResponse<PersonResponse>>(
    endpoints.person.createBeneficiary.url,
    data,
  )
}

export const createContactRequest: MutationFunction<
  AxiosResponse<ContactRequestResponse>,
  ContactRequestInput
> = async (data: ContactRequestInput) => {
  return await apiClient.post<ContactRequestInput, AxiosResponse<ContactRequestResponse>>(
    endpoints.support.createInfoRequest.url,
    data,
  )
}

export const createSupportRequest: MutationFunction<
  AxiosResponse<SupportRequestResponse>,
  SupportRequestInput
> = async (data: SupportRequestInput) => {
  return await apiClient.post<SupportRequestInput, AxiosResponse<SupportRequestResponse>>(
    endpoints.support.createSupportRequest.url,
    data,
  )
}

export const createCampaign: MutationFunction<AxiosResponse<CampaignResponse>, CampaignInput> =
  async (data: CampaignInput) => {
    return await apiClient.post<CampaignInput, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.createCampaign.url,
      data,
    )
  }

export const createCheckoutSession: MutationFunction<
  AxiosResponse<CheckoutSessionResponse>,
  CheckoutSessionInput
> = async (data: CheckoutSessionInput) => {
  return await apiClient.post<CheckoutSessionInput, AxiosResponse<CheckoutSessionResponse>>(
    endpoints.donation.createCheckoutSession.url,
    data,
  )
}

export const createCountry: MutationFunction<AxiosResponse<CountryResponse>, CountryInput> = async (
  data: CountryInput,
) => {
  return await axios.post<CountryInput, AxiosResponse<CountryResponse>>(
    endpoints.country.createCountry.url,
    data,
  )
}

export const getCountry: MutationFunction<AxiosResponse<CountryResponse>, string> = async (
  id: string,
) => {
  return await axios.get<string, AxiosResponse<CountryResponse>>(
    endpoints.country.viewCountry(id).url,
  )
}

type EditCountryProp = {
  id: string
  data: CountryInput
}

export const editCountry: MutationFunction<AxiosResponse<CountryResponse>, EditCountryProp> =
  async ({ id, data }: EditCountryProp) => {
    return await axios.patch<CountryResponse, AxiosResponse<CountryResponse>>(
      endpoints.country.editCountry(id).url,
      data,
    )
  }

export const deleteCountry: MutationFunction<AxiosResponse<CountryResponse>, string> = async (
  id: string,
) => {
  return await axios.delete<string, AxiosResponse<CountryResponse>>(
    endpoints.country.deleteCountry(id).url,
  )
}
