import { useKeycloak } from '@react-keycloak/ssr'
import { PersonResponse } from 'gql/person'
import { KeycloakInstance } from 'keycloak-js'
import { useQuery } from 'react-query'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

export const usePersonList = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<PersonResponse[]>(
    endpoints.person.list.url,
    authQueryFnFactory<PersonResponse[]>(keycloak?.token),
  )
}
