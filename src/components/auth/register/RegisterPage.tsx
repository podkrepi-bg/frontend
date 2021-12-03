import React, { useEffect } from 'react'
import { KeycloakInstance } from 'keycloak-js'
import { LinearProgress } from '@mui/material'
import { useKeycloak } from '@react-keycloak/ssr'

import { baseUrl, routes } from 'common/routes'

export default function LoginPage() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  useEffect(() => {
    keycloak?.register({
      redirectUri: `${baseUrl}${routes.profile}`,
    })
  }, [])

  return <LinearProgress />
}
