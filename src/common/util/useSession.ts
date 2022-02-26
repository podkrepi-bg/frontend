import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js'

export type Session = {
  user?: {
    name: string
    email: string
    image: string
  }
}

export type ParsedToken = KeycloakTokenParsed & {
  name?: string
  email?: string
  given_name?: string
  family_name?: string
  preferred_username?: string
  email_verified?: boolean
  picture?: string
  'allowed-origins'?: string[]
}

export function useSession(): {
  session: ParsedToken | null
  keycloak: KeycloakInstance | undefined
} {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  if (!keycloak?.authenticated) {
    return { keycloak, session: null }
  }

  return {
    keycloak,
    session: keycloak?.tokenParsed ?? null,
  }
}

export default { useSession }
