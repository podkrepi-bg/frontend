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
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { DocumentInput, DocumentResponse } from 'gql/document'

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

export function useCreateDocument() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: DocumentInput) => {
    return await apiClient.post<DocumentInput, AxiosResponse<DocumentResponse>>(
      endpoints.documents.createDocument.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useEditDocument(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: DocumentInput) => {
    return await apiClient.put<DocumentInput, AxiosResponse<DocumentResponse>>(
      endpoints.documents.editDocument(slug).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteDocument(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<DocumentResponse, AxiosResponse<DocumentResponse>>(
      endpoints.documents.deleteDocument(slug).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteManyDocuments(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<DocumentResponse, AxiosResponse<DocumentResponse>>(
      endpoints.documents.deleteDocuments.url,
      idsToDelete,
      authConfig(keycloak?.token),
    )
  }
}
