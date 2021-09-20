import { MutationFunction, QueryFunction } from 'react-query'

import { axios } from 'common/api-client'
import {
  SupportRequest,
  SupportRequestInput,
} from 'components/support-form/helpers/support-form.types'
import { ContactRequest, ContactRequestInput } from 'gql/contact'
import { Campaign, CampaignInput } from 'gql/campaigns'
import { AxiosResponse } from 'axios'

export const queryFn: QueryFunction = async function ({ queryKey }) {
  const response = await axios.get(queryKey.join('/'))
  return await response.data
}

export const createContactRequest: MutationFunction<
  AxiosResponse<ContactRequest>,
  ContactRequestInput
> = async (data: ContactRequestInput) =>
  await axios.post<ContactRequestInput, AxiosResponse<ContactRequest>>(
    '/support/create-inquiry',
    data,
  )

export const createSupportRequest: MutationFunction<
  AxiosResponse<SupportRequest>,
  SupportRequestInput
> = async (data: SupportRequestInput) =>
  await axios.post<SupportRequestInput, AxiosResponse<SupportRequest>>(
    '/support/create-request',
    data,
  )

export const createCampaign: MutationFunction<AxiosResponse<Campaign>, CampaignInput> = async (
  data: CampaignInput,
) => await axios.post<CampaignInput, AxiosResponse<Campaign>>('/campaign/create-campaign', data)
