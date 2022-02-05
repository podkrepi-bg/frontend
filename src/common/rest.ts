import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { MutationFunction, QueryFunction } from 'react-query'
import { axios } from 'common/api-client'
import {
  SupportRequestResponse,
  SupportRequestInput,
} from 'components/support-form/helpers/support-form.types'

import { ContactRequestResponse, ContactRequestInput } from 'gql/contact'
import { CampaignResponse, CampaignInput } from 'gql/campaigns'
import { CheckoutSessionInput, CheckoutSessionResponse } from 'gql/donations'
import { CreateBeneficiaryInput, PersonResponse } from 'gql/person'
import {
  AnimalInput,
  AnimalResponse,
  BootcampStudentInput,
  BootcampStudentResponse,
} from 'gql/bootcamp'

import { endpoints } from './api-endpoints'

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

export const createBootcampStudent: MutationFunction<
  AxiosResponse<BootcampStudentResponse>,
  BootcampStudentInput
> = async (data: BootcampStudentInput) => {
  return await axios.post<BootcampStudentInput, AxiosResponse<BootcampStudentResponse>>(
    endpoints.bootcampStudent.createStudent.url,
    data,
  )
}

export const editBootcampStudent: MutationFunction<
  AxiosResponse<BootcampStudentResponse>,
  BootcampStudentResponse
> = async (data: BootcampStudentResponse) => {
  return await axios.patch<BootcampStudentInput, AxiosResponse<BootcampStudentResponse>>(
    endpoints.bootcampStudent.editStudent(data.id).url,
    data,
  )
}

export const deleteBootcampStudent: MutationFunction<AxiosResponse<null>, { slug: string }> =
  async ({ slug }: { slug: string }) => {
    return await axios.delete<null>(endpoints.bootcampStudent.deleteStudent(slug).url)
  }

export const createAnimal: MutationFunction<AxiosResponse<AnimalResponse>, AnimalInput> = async (
  data: AnimalInput,
) => {
  return await axios.post<AnimalInput, AxiosResponse<AnimalResponse>>(
    endpoints.animals.create.url,
    data,
  )
}

export const editAnimal: MutationFunction<AxiosResponse<AnimalResponse>, AnimalResponse> = async (
  data: AnimalResponse,
) => {
  return await axios.patch<AnimalInput, AxiosResponse<AnimalResponse>>(
    endpoints.animals.edit(data.id).url,
    data,
  )
}

export const deleteAnimal: MutationFunction<AxiosResponse<null>, { slug: string }> = async ({
  slug,
}: {
  slug: string
}) => {
  return await axios.delete<null>(endpoints.animals.deleteAnimal(slug).url)
}
