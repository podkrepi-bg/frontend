import { AxiosResponse } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { Person, UpdatePerson } from 'gql/person'
import { authConfig, authQueryFnFactory } from 'service/restRequests'
import { Credentials } from 'components/client/auth/profile/UpdatePasswordModal'
import { ForgottenPasswordForm } from 'components/client/auth/forgottenPassword/ForgottenPasswordForm'
import { ChangePasswordFormData } from 'components/client/auth/changePassword/ChangePasswordForm'

type CurrentPerson = {
  user: Person
  status: 'unauthenticated'
}

export function getCurrentPerson(isNew = false) {
  const { data: session } = useSession()
  return useQuery<CurrentPerson>(
    [isNew ? endpoints.account.new.url : endpoints.account.me.url],
    authQueryFnFactory<CurrentPerson>(session?.accessToken),
  )
}

export function useCurrentPerson() {
  const { data: session } = useSession()
  return useQuery<CurrentPerson>(
    [endpoints.account.me.url],
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

export function forgottenPassword() {
  return async (data: ForgottenPasswordForm) => {
    return await apiClient.post<ForgottenPasswordForm, AxiosResponse<boolean>>(
      endpoints.account.forgottenPassword.url,
      data,
    )
  }
}

export function resetPassword() {
  return async (data: ChangePasswordFormData) => {
    return await apiClient.post<ChangePasswordFormData, AxiosResponse<boolean>>(
      endpoints.account.resetPassword.url,
      data,
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
