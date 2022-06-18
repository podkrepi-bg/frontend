import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { Person, UpdatePerson } from 'gql/person'
import { authConfig, authQueryFnFactory } from 'service/restRequests'
import { Credentials } from 'components/auth/profile/UpdatePasswordModal'

type CurrentPerson = {
  user: Person
  status: 'unauthenticated'
}

export function getCurrentPerson(isNew = false) {
  const { data: session } = useSession()
  return useQuery<CurrentPerson>(
    isNew ? endpoints.account.new.url : endpoints.account.me.url,
    authQueryFnFactory<CurrentPerson>(session?.accessToken),
  )
}

export function useCurrentPerson() {
  const { data: session } = useSession()
  return useQuery<CurrentPerson>(
    endpoints.account.me.url,
    authQueryFnFactory<CurrentPerson>(session?.accessToken),
  )
}

export function updateCurrentPerson() {
  const { data: session } = useSession()
  return async (data: UpdatePerson) => {
    return await apiClient.put<UpdatePerson, AxiosResponse<Person>>(
      endpoints.account.update.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function updateCurrentPersonPassword() {
  const { data: session } = useSession()
  return async (data: Credentials) => {
    return await apiClient.put<Credentials, AxiosResponse<boolean>>(
      endpoints.account.updatePassword.url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export function disableCurrentPerson() {
  const { data: session } = useSession()
  return async () => {
    return await apiClient.delete<UpdatePerson, AxiosResponse<Person>>(
      endpoints.account.update.url,
      authConfig(session?.accessToken),
    )
  }
}

export default { useCurrentPerson, updateCurrentPerson, getCurrentPerson }
