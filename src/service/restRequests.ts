import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { MutationFunction, QueryFunction } from 'react-query'

import { apiClient, apiClient as axios } from 'service/apiClient'
import {
  SupportRequestResponse,
  SupportRequestInput,
} from 'components/support-form/helpers/support-form.types'
import { ContactRequestResponse, ContactRequestInput } from 'gql/contact'
import { CampaignResponse, CampaignInput } from 'gql/campaigns'

import { endpoints } from './apiEndpoints'
import { CheckoutSessionInput, CheckoutSessionResponse } from 'gql/donations'
import { CreateBeneficiaryInput, PersonFormData, PersonResponse } from 'gql/person'
import { CityInput, CityResponse } from 'gql/city'
import { CampaignTypeFormData, CampaignTypesInput, CampaignTypesResponse } from 'gql/campaign-types'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'

const authConfig = (token: string) => {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : { headers: {} }
}

export const queryFn: QueryFunction = async function ({ queryKey }) {
  const response = await axios.get(queryKey.join('/'))
  return await response.data
}

export const queryFnFactory = <T>(config?: AxiosRequestConfig): QueryFunction<T> =>
  async function ({ queryKey }) {
    const response = await axios.get(queryKey.join('/'), config)
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
  return await axios.post<CreateBeneficiaryInput, AxiosResponse<PersonResponse>>(
    endpoints.person.createBeneficiary.url,
    data,
  )
}

export const createContactRequest: MutationFunction<
  AxiosResponse<ContactRequestResponse>,
  ContactRequestInput
> = async (data: ContactRequestInput) => {
  return await axios.post<ContactRequestInput, AxiosResponse<ContactRequestResponse>>(
    endpoints.support.createInfoRequest.url,
    data,
  )
}

export const createSupportRequest: MutationFunction<
  AxiosResponse<SupportRequestResponse>,
  SupportRequestInput
> = async (data: SupportRequestInput) => {
  return await axios.post<SupportRequestInput, AxiosResponse<SupportRequestResponse>>(
    endpoints.support.createSupportRequest.url,
    data,
  )
}

export const createCampaign: MutationFunction<AxiosResponse<CampaignResponse>, CampaignInput> =
  async (data: CampaignInput) => {
    return await axios.post<CampaignInput, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.createCampaign.url,
      data,
    )
  }

export const createCheckoutSession: MutationFunction<
  AxiosResponse<CheckoutSessionResponse>,
  CheckoutSessionInput
> = async (data: CheckoutSessionInput) => {
  return await axios.post<CheckoutSessionInput, AxiosResponse<CheckoutSessionResponse>>(
    endpoints.donation.createCheckoutSession.url,
    data,
  )
}

export const createCity: MutationFunction<AxiosResponse<CityResponse>, CityInput> = async (
  data: CityInput,
) => {
  return await axios.post<CityInput, AxiosResponse<CityResponse>>(
    endpoints.city.createCity.url,
    data,
  )
}

export const editCity = async (id: string, data: CityInput) => {
  return await axios.put<CityInput, AxiosResponse<CityResponse>>(
    endpoints.city.editCity(id).url,
    data,
  )
}

export const createCampaignType: MutationFunction<
  AxiosResponse<CampaignTypesResponse>,
  CampaignTypesInput
> = async (data: CampaignTypesInput) => {
  return await axios.post<CampaignTypesInput, AxiosResponse<CampaignTypesResponse>>(
    endpoints.campaignTypes.createCampaignType.url,
    data,
  )
}

export const editCampaignType = async (id: string, data: CampaignTypeFormData) => {
  return await axios.put<CampaignTypeFormData, AxiosResponse<CampaignTypesResponse>>(
    endpoints.campaignTypes.editCampaignType(id).url,
    data,
  )
}

export const createPerson: MutationFunction<AxiosResponse<PersonFormData>, PersonFormData> = async (
  data: PersonFormData,
) => {
  return await axios.post<PersonFormData, AxiosResponse<PersonFormData>>(
    endpoints.person.createPerson.url,
    data,
  )
}

export const editPerson = async (id: string, data: PersonFormData) => {
  return await axios.put<PersonFormData, AxiosResponse<PersonFormData>>(
    endpoints.person.viewPerson(id).url,
    data,
  )
}

export const useCreateBeneficiary = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>() // <-- NEW
  return async (data: CampaignInput) =>
    await apiClient.post<CampaignInput, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.createCampaign.url,
      data,
      authConfig(keycloak?.token || ''),
    )
}
