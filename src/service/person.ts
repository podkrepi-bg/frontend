import { useSession } from 'next-auth/react'

import { endpoints } from './apiEndpoints'
import { AdminPersonFormData, AdminPersonResponse, PersonResponse } from 'gql/person'
import { authConfig, authQueryFnFactory } from './restRequests'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from './apiClient'
import { AxiosResponse } from 'axios'

export const useViewPerson = (id: string) => {
  const { data: session } = useSession()

  return useQuery(
    [endpoints.person.viewPerson(id).url],
    authQueryFnFactory<PersonResponse>(session?.accessToken),
  )
}

export const useCreatePerson = () => {
  const { data: session } = useSession()
  return async (data: AdminPersonFormData) => {
    return await apiClient.post<AdminPersonFormData, AxiosResponse<AdminPersonResponse>>(
      endpoints.person.createPerson.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const useEditPerson = (id: string) => {
  const { data: session } = useSession()
  return async (data: AdminPersonFormData) => {
    return await apiClient.patch<AdminPersonFormData, AxiosResponse<AdminPersonResponse>>(
      endpoints.person.editPerson(id).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function useDeletePerson(id: string) {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<PersonResponse, AxiosResponse<PersonResponse>>(
      endpoints.person.deletePerson(id).url,
      authConfig(session?.accessToken),
    )
  }
}
