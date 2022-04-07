import { useKeycloak } from '@react-keycloak/ssr'
import { Person } from 'gql/person'
import { KeycloakInstance } from 'keycloak-js'
import { useQuery } from 'react-query'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

export function useCurrentPerson() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<Person>(endpoints.account.me.url, authQueryFnFactory<Person>(keycloak?.token))
}

export default { useCurrentPerson }
