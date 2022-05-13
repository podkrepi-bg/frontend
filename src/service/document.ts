import { useSession } from 'next-auth/react'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import { DocumentInput, DocumentResponse } from 'gql/document'

export function useCreateDocument() {
  const { data: session } = useSession()
  return async (data: DocumentInput) => {
    return await apiClient.post<DocumentResponse, AxiosResponse<DocumentResponse>>(
      endpoints.documents.createDocument.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useEditDocument(slug: string) {
  const { data: session } = useSession()
  return async (data: DocumentInput) => {
    return await apiClient.put<DocumentResponse, AxiosResponse<DocumentResponse>>(
      endpoints.documents.editDocument(slug).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useDeleteDocument(slug: string) {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<DocumentResponse, AxiosResponse<DocumentResponse>>(
      endpoints.documents.deleteDocument(slug).url,
      authConfig(session?.accessToken),
    )
  }
}
