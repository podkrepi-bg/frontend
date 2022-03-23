import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'
import { campaignDocumentInput, campaignDocumentResponse, DeleteMany } from 'gql/campaign-document'
import { KeycloakInstance } from 'keycloak-js'
import { QueryClient } from 'react-query'
import { apiClient } from './apiClient'
import { endpoints } from './apiEndpoints'
import { authConfig, authQueryFnFactory } from './restRequests'

export function useCreateCampaignDocument() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: campaignDocumentInput) => {
    return await apiClient.post<campaignDocumentResponse, AxiosResponse<campaignDocumentResponse>>(
      endpoints.campaignDocument.createDocument.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useEditCampaignDocument(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: campaignDocumentInput) => {
    return await apiClient.patch<campaignDocumentResponse, AxiosResponse<campaignDocumentResponse>>(
      endpoints.campaignDocument.editDocument(id).url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export function useDeleteCampaignDocument() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (id: string) => {
    return await apiClient.delete<
      campaignDocumentResponse,
      AxiosResponse<campaignDocumentResponse>
    >(endpoints.campaignDocument.removeDocument(id).url, authConfig(keycloak?.token))
  }
}

export function useRemoveManyCampaignDocument(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<DeleteMany, AxiosResponse<[]>>(
      endpoints.campaignDocument.removeManyDocuments.url,
      idsToDelete,
      authConfig(keycloak?.token),
    )
  }
}

export async function prefetchCampaignDocument(client: QueryClient, token?: string) {
  await client.prefetchQuery<campaignDocumentResponse[]>(
    endpoints.campaignDocument.listDocuments.url,
    authQueryFnFactory<campaignDocumentResponse[]>(token),
  )
}

export async function prefetchCampaignDocumentById(
  client: QueryClient,
  id: string,
  token?: string,
) {
  await client.prefetchQuery<campaignDocumentResponse>(
    endpoints.campaignDocument.editDocument(id).url,
    authQueryFnFactory<campaignDocumentResponse>(token),
  )
}
