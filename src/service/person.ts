import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { endpoints } from './apiEndpoints'
import { PersonResponse } from 'gql/person'
import { authQueryFnFactory } from './restRequests'
import { useQuery } from 'react-query'

export const usePeopleList = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return useQuery(endpoints.person.list.url, authQueryFnFactory<PersonResponse[]>(keycloak?.token))
}

export const useViewPerson = (id: string) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return useQuery(
    endpoints.person.viewPerson(id).url,
    authQueryFnFactory<PersonResponse>(keycloak?.token),
  )
}
