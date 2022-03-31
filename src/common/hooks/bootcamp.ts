import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { BootcampResponse } from 'gql/bootcamp'

export function useTasksList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BootcampResponse[]>(
    endpoints.bootcamp.tasksList.url,
    authQueryFnFactory<BootcampResponse[]>(keycloak?.token),
  )
}

export function useTask(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BootcampResponse>(
    endpoints.bootcamp.viewTaskById(id).url,
    authQueryFnFactory<BootcampResponse>(keycloak?.token),
  )
}
