//external imports
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { QueryClient, useQuery } from 'react-query'

//absolute imports
import { endpoints } from 'common/api-endpoints'
import { authQueryFnFactory } from 'common/rest'

//relative imports

// define the type of the data
type BootcampIntern = {
  id: string
  firstName: string
  lastName: string
  email: string
}

export function useBootcampInternList() {
  const { keycloak } = useKeycloak<KeycloakInstance>() // initializing a keyCloak instance;
  return useQuery<BootcampIntern[]>(
    endpoints.bootcampIntern.listBootcampIntern.url,
    authQueryFnFactory<BootcampIntern[]>(keycloak?.token),
  )
}
