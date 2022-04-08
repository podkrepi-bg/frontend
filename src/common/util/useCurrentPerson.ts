import { useKeycloak } from '@react-keycloak/ssr'
import { AxiosResponse } from 'axios'
import { Person, UpdatePerson } from 'gql/person'
import { KeycloakInstance } from 'keycloak-js'
import { useQuery } from 'react-query'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { authConfig, authQueryFnFactory } from 'service/restRequests'

export function useCurrentPerson() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<Person>(endpoints.account.me.url, authQueryFnFactory<Person>(keycloak?.token))
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

export default { useCurrentPerson }
