import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'
import {
  campaignDocumentRoleInput,
  campaignDocumentRoleResponse,
  DeleteMany,
} from 'gql/campaign-document-role'
import { KeycloakInstance } from 'keycloak-js'
import { QueryClient } from 'react-query'
import { apiClient } from './apiClient'
import { endpoints } from './apiEndpoints'
import { authConfig, authQueryFnFactory } from './restRequests'

export function useCreateCampaignDocumentRole() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: campaignDocumentRoleInput) => {
    return await apiClient.post<
      campaignDocumentRoleResponse,
      AxiosResponse<campaignDocumentRoleResponse>
    >(endpoints.campaignDocumentRole.createDocument.url, data, authConfig(keycloak?.token))
  }
}

export function useEditCampaignDocumentRole(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: campaignDocumentRoleInput) => {
    return await apiClient.patch<
      campaignDocumentRoleResponse,
      AxiosResponse<campaignDocumentRoleResponse>
    >(endpoints.campaignDocumentRole.editDocument(id).url, data, authConfig(keycloak?.token))
  }
}

export function useDeleteCampaignDocumentRole() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (id: string) => {
    return await apiClient.delete<
      campaignDocumentRoleResponse,
      AxiosResponse<campaignDocumentRoleResponse>
    >(endpoints.campaignDocumentRole.removeDocument(id).url, authConfig(keycloak?.token))
  }
}

export function useRemoveManyCampaignDocumentRole(idsToDelete: string[]) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async () => {
    return await apiClient.post<DeleteMany, AxiosResponse<[]>>(
      endpoints.campaignDocumentRole.removeManyDocuments.url,
      idsToDelete,
      authConfig(keycloak?.token),
    )
  }
}

export async function prefetchCampaignDocumentRole(client: QueryClient, token?: string) {
  await client.prefetchQuery<campaignDocumentRoleResponse[]>(
    endpoints.campaignDocumentRole.listDocuments.url,
    authQueryFnFactory<campaignDocumentRoleResponse[]>(token),
  )
}

export async function prefetchCampaignDocumentRolById(
  client: QueryClient,
  id: string,
  token?: string,
) {
  await client.prefetchQuery<campaignDocumentRoleResponse>(
    endpoints.campaignDocumentRole.editDocument(id).url,
    authQueryFnFactory<campaignDocumentRoleResponse>(token),
  )
}
