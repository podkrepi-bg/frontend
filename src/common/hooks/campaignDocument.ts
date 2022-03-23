import { useKeycloak } from '@react-keycloak/ssr'
import { campaignDocumentResponse } from 'gql/campaign-document'
import { KeycloakInstance } from 'keycloak-js'
import { useQuery } from 'react-query'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

export function useDocumentList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<campaignDocumentResponse[]>(
    endpoints.campaignDocument.listDocuments.url,
    authQueryFnFactory<campaignDocumentResponse[]>(keycloak?.token),
  )
}

export function useDocument(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<campaignDocumentResponse>(
    endpoints.campaignDocument.viewDocument(id).url,
    authQueryFnFactory<campaignDocumentResponse>(keycloak?.token),
  )
}
