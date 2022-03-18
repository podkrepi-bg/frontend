import { useKeycloak } from '@react-keycloak/ssr'
import { campaignDocumentRoleResponse } from 'gql/campaign-document-role'
import { KeycloakInstance } from 'keycloak-js'
import { useQuery } from 'react-query'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

export function useDocumentList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<campaignDocumentRoleResponse[]>(
    endpoints.campaignDocumentRole.listDocuments.url,
    authQueryFnFactory<campaignDocumentRoleResponse[]>(keycloak?.token),
  )
}

export function useDocument(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<campaignDocumentRoleResponse>(
    endpoints.campaignDocumentRole.viewDocument(id).url,
    authQueryFnFactory<campaignDocumentRoleResponse>(keycloak?.token),
  )
}
