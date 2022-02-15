import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Container, Grid } from '@mui/material'

import { routes } from 'common/routes'
import { isAdmin } from 'common/util/roles'
import Layout from 'components/layout/Layout'
import { useSession } from 'common/util/useSession'
import LinkButton from 'components/common/LinkButton'

export default function ProfilePage() {
  const { t } = useTranslation()

  const { keycloak, session } = useSession()

  if (!keycloak?.authenticated) {
    return (
      <Layout
        title={t('nav.profile')}
        githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/auth/profile/ProfilePage.tsx"
        figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5987%3A21094">
        Not authenticated
      </Layout>
    )
  }

  return (
    <Layout
      title={t('nav.profile')}
      githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/auth/profile/ProfilePage.tsx"
      figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5987%3A21094">
      <Container maxWidth="xl">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <ul>
              <li>
                <span className="font-weight-bold mr-1">ID: </span>
                <strong className="text-muted">{session?.sub ?? ''}</strong>
              </li>
              <li>
                <span className="font-weight-bold mr-1">Email: </span>
                <strong className="text-muted">{session?.email ?? ''}</strong>
              </li>
              <li>
                <span className="font-weight-bold mr-1">First Name: </span>
                <strong className="text-muted">{session?.given_name ?? ''}</strong>
              </li>
              <li>
                <span className="font-weight-bold mr-1">Last Name: </span>
                <strong className="text-muted">{session?.family_name ?? ''}</strong>
              </li>
              <li>
                <span className="font-weight-bold mr-1">Administrator access: </span>
                <strong className="text-muted">
                  {keycloak?.authenticated && isAdmin(keycloak) ? 'Administrator' : 'User'}
                </strong>
              </li>
              <li>
                <span className="font-weight-bold mr-1">Allowed origins: </span>
                <span className="text-muted">
                  <pre>
                    {JSON.stringify((session && session['allowed-origins']) ?? [], null, 2)}
                  </pre>
                </span>
              </li>
              <li>
                <span className="font-weight-bold mr-1">Roles: </span>
                <span className="text-muted">
                  <pre>{JSON.stringify(keycloak.resourceAccess, null, 2)}</pre>
                </span>
              </li>
            </ul>
          </Grid>
          {/* <Grid item>
            <pre>JWT: {keycloak.token?.substring(0, 30)}...</pre>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <pre>{JSON.stringify(keycloak, null, 2)}</pre>
          </Grid> */}
        </Grid>

        <Box textAlign="center">
          <LinkButton variant="contained" href={routes.logout}>
            {t('nav.logout')}
          </LinkButton>
        </Box>
      </Container>
    </Layout>
  )
}
