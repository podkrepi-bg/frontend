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
import { DocumentInput, DocumentResponse } from 'gql/document'
import { CountryInput, CountryResponse } from 'gql/countries'

import { endpoints } from './apiEndpoints'
import { VaultInput, VaultResponse } from 'gql/vault'

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

export function useCreateDocument() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: DocumentInput) => {
    return await apiClient.post<DocumentResponse, AxiosResponse<DocumentResponse>>(
      endpoints.documents.createDocument.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useEditDocument(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: DocumentInput) => {
    return await apiClient.put<DocumentResponse, AxiosResponse<DocumentResponse>>(
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

export function useCreateVault() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: VaultInput) => {
    return await apiClient.post<VaultResponse, AxiosResponse<VaultResponse>>(
      endpoints.vaults.createVault.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useEditVault(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: VaultInput) => {
    return await apiClient.put<VaultResponse, AxiosResponse<VaultResponse>>(
      endpoints.vaults.editVault(slug).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteVault(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.delete<VaultResponse, AxiosResponse<VaultResponse>>(
      endpoints.vaults.deleteVault(slug).url,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteManyVaults(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<VaultResponse, AxiosResponse<VaultResponse>>(
      endpoints.vaults.deleteVaults.url,
      idsToDelete,
      authConfig(keycloak?.token),
    )
  }
}

export const useCreateCountry = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: CountryInput) =>
    await apiClient.post<CountryInput, AxiosResponse<CountryResponse>>(
      endpoints.country.createCountry.url,
      data,
      authConfig(keycloak?.token),
    )
}

export const getCountry = async (id: string) => {
  return await apiClient.get<string, AxiosResponse<CountryResponse>>(
    endpoints.country.viewCountry(id).url,
  )
}

export const useEditCountry = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async ({ id, data }: { id: string; data: CountryInput }) => {
    return await apiClient.patch<CountryResponse, AxiosResponse<CountryResponse>>(
      endpoints.country.editCountry(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export const useDeleteCountry = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (id: string) => {
    return await apiClient.delete<string, AxiosResponse<CountryResponse>>(
      endpoints.country.deleteCountry(id).url,
      authConfig(keycloak?.token),
    )
  }
}
