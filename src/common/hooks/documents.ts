import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from '../api-endpoints'
import { authQueryFnFactory } from '../rest'
import { DocumentResponse } from 'gql/document'

export function useDocumentsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<DocumentResponse[]>(
    endpoints.documents.documentsList.url,
    authQueryFnFactory<DocumentResponse[]>(keycloak?.token),
  )
}

export async function prefetchDocumentsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<DocumentResponse[]>(
    endpoints.documents.documentsList.url,
    authQueryFnFactory<DocumentResponse[]>(token),
  )
}

export function useDocument(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<DocumentResponse>(
    endpoints.documents.getDocument(id).url,
    authQueryFnFactory<DocumentResponse>(keycloak?.token),
  )
}
