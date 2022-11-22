import { useSession } from 'next-auth/react'
import { QueryClient, useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { DocumentResponse } from 'gql/document'

export function useDocumentsList() {
  const { data: session } = useSession()
  return useQuery<DocumentResponse[]>(
    [endpoints.documents.documentsList.url],
    authQueryFnFactory<DocumentResponse[]>(session?.accessToken),
  )
}

export function useDocument(id: string) {
  const { data: session } = useSession()
  return useQuery<DocumentResponse>(
    [endpoints.documents.getDocument(id).url],
    authQueryFnFactory<DocumentResponse>(session?.accessToken),
  )
}

export async function prefetchDocumentsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<DocumentResponse[]>(
    [endpoints.documents.documentsList.url],
    authQueryFnFactory<DocumentResponse[]>(token),
  )
}

export async function prefetchDocumentById(client: QueryClient, slug: string, token?: string) {
  await client.prefetchQuery<DocumentResponse>(
    [endpoints.documents.getDocument(slug).url],
    authQueryFnFactory<DocumentResponse>(token),
  )
}
