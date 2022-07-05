import { AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'

import { apiClient } from 'service/apiClient'

import { endpoints } from './apiEndpoints'
import { authConfig } from './restRequests'
import { OrganizerInput, OrganizerResponse } from 'gql/organizer'

export const createOrganizer = () => {
  const { data: session } = useSession()
  return async (data: OrganizerInput) => {
    return await apiClient.post<OrganizerInput, AxiosResponse<OrganizerResponse>>(
      endpoints.organizer.createOrganizer.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const deleteOrganizer = (id: string) => {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<OrganizerResponse, AxiosResponse<OrganizerResponse>>(
      endpoints.organizer.removeOrganizer(id).url,
      authConfig(session?.accessToken),
    )
  }
}
