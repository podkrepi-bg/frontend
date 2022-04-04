import { useKeycloak } from '@react-keycloak/ssr'
import { BootcampResponse } from 'gql/bootcamp'
import { KeycloakInstance } from 'keycloak-js'
import { useQuery } from 'react-query'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

export function useBootcampGetOne(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  return useQuery<BootcampResponse>(
    endpoints.bootcamp.getOne(id).url,
    authQueryFnFactory<BootcampResponse>(keycloak?.token),
  )
}
