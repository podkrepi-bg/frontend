import React, { useEffect } from 'react'
import { KeycloakInstance } from 'keycloak-js'
import { LinearProgress } from '@mui/material'
import { useKeycloak } from '@react-keycloak/ssr'

import { baseUrl } from 'common/routes'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const { pathname } = router.query

  useEffect(() => {
    keycloak?.login({
      redirectUri: `${baseUrl}${pathname}`,
    })
  }, [])

  return <LinearProgress />
}
