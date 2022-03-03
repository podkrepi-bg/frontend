import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { DocumentInput, DocumentResponse } from 'gql/document'

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
