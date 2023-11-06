import { getSession, useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { PersonPaginatedResponse, PersonResponse } from 'gql/person'
import { endpoints } from 'service/apiEndpoints'
import { authConfig, authQueryFnFactory } from 'service/restRequests'
import { PaginationData, SortData } from 'gql/types'
import { AxiosError, AxiosResponse } from 'axios'
import { apiClient } from 'service/apiClient'

export type TActiveStatusMutationBody = {
  keycloakId: string
  profileEnabled: boolean
}

export const usePersonList = (
  paginationData?: PaginationData,
  sort?: SortData,
  searchData?: string,
) => {
  const { data: session } = useSession()
  return useQuery<PersonPaginatedResponse>(
    [endpoints.person.list(paginationData, sort, searchData).url],
    authQueryFnFactory<PersonPaginatedResponse>(session?.accessToken),
  )
}

export function usePerson(id: string) {
  const { data: session } = useSession()
  return useQuery<PersonResponse>(
    [endpoints.person.viewPerson(id).url],
    authQueryFnFactory<PersonResponse>(session?.accessToken),
  )
}

export function useViewPersonByKeylockId(id: string) {
  const { data: session } = useSession()

  return useQuery(
    [endpoints.person.viewPersonByKeylockId(id).url],
    authQueryFnFactory<PersonResponse>(session?.accessToken),
  )
}

export function useChangeProfileStatus() {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<PersonResponse>,
    AxiosError<PersonResponse>,
    TActiveStatusMutationBody
  >({
    mutationFn: async (data: TActiveStatusMutationBody) => {
      const session = await getSession()
      return await apiClient.patch(
        endpoints.account.updateProfileActiveStatus(data.keycloakId).url,
        { profileEnabled: data.profileEnabled },
        authConfig(session?.accessToken),
      )
    },
    onSuccess: () => queryClient.invalidateQueries([endpoints.person.list().url]),
  })
}
