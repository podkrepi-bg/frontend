/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { MutationFunction, QueryFunction } from 'react-query'

import { axios } from 'common/api-client'
import {
  SupportRequestResponse,
  SupportRequestInput,
} from 'components/support-form/helpers/support-form.types'
import { ContactRequestResponse, ContactRequestInput } from 'gql/contact'
import { CampaignResponse, CampaignInput } from 'gql/campaigns'
import { BootcampResponse, BootcampInput } from 'gql/bootcamps'

import { endpoints } from './api-endpoints'
import { CheckoutSessionInput, CheckoutSessionResponse } from 'gql/donations'
import { CreateBeneficiaryInput, PersonResponse } from 'gql/person'

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

export const createBootcamp: MutationFunction<AxiosResponse<BootcampResponse>, BootcampInput> =
  async (data: BootcampInput) => {
    return await axios.post<BootcampInput, AxiosResponse<BootcampResponse>>(
      endpoints.bootcamp.createBootcamp.url,
      data,
    )
  }

  export const editBootcamp = async (data: any) => {
    return await axios.patch<any>(endpoints.bootcamp.editBootcamp(data.id).url, data.data)
  }


export const deleteBootcamp: MutationFunction<AxiosResponse<null>, {id: string}> =
  async ({id}: {id: string}) => {
    return await axios.delete<null>(
      endpoints.bootcamp.deleteBootcamp(id).url,
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
