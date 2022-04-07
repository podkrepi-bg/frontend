import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { useQuery } from 'react-query'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

type CurrentPerson = {
  person: {
    id: string
    emai: string
  }
}

export function useCurrentPerson() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<CurrentPerson>(
    endpoints.account.me.url,
    authQueryFnFactory<CurrentPerson>(keycloak?.token),
  )
}

export default { useCurrentPerson }
