import React, { useEffect } from 'react'
import { KeycloakInstance } from 'keycloak-js'
import { LinearProgress } from '@mui/material'
import { useKeycloak } from '@react-keycloak/ssr'

import { baseUrl, routes } from 'common/routes'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const { pathname } = router.query

  const redirectPath = pathname ? pathname : routes.profile.index

  useEffect(() => {
    keycloak?.login({
      redirectUri: `${baseUrl}${redirectPath}`,
    })
  }, [])

  return <LinearProgress />
}
