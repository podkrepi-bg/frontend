import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from '../api-endpoints'
import { authQueryFnFactory } from '../rest'
import { DocumentType } from 'gql/document'

export function useDocumentsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<DocumentType[]>(
    endpoints.documents.documentsList.url,
    authQueryFnFactory<DocumentType[]>(keycloak?.token),
  )
}

export async function prefetchDocumentsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<DocumentType[]>(
    endpoints.documents.documentsList.url,
    authQueryFnFactory<DocumentType[]>(token),
  )
}

export function useDocument(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<DocumentType>(
    endpoints.documents.getDocument.url + '/' + id,
    authQueryFnFactory<DocumentType>(keycloak?.token),
  )
}
