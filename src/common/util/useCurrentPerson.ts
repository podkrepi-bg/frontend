import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'
import { Person, UpdatePerson } from 'gql/person'
import { KeycloakInstance } from 'keycloak-js'
import { useQuery } from 'react-query'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { authConfig, authQueryFnFactory } from 'service/restRequests'

type CurrentPerson = {
  user: Person
}

export function getCurrentPerson(isNew = false) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CurrentPerson>(
    isNew ? endpoints.account.new.url : endpoints.account.me.url,
    authQueryFnFactory<CurrentPerson>(keycloak?.token),
  )
}

export function useCurrentPerson() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CurrentPerson>(
    endpoints.account.me.url,
    authQueryFnFactory<CurrentPerson>(keycloak?.token),
  )
}

export function updateCurrentPerson() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return async (data: UpdatePerson) => {
    return await apiClient.put<UpdatePerson, AxiosResponse<Person>>(
      endpoints.account.update.url,
      data,
      authConfig(keycloak?.token),
    )
  }
}

export default { useCurrentPerson, updateCurrentPerson, getCurrentPerson }
