import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@material-ui/core'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { routes } from 'common/routes'
import { isAdmin } from 'common/util/roles'
import Layout from 'components/layout/Layout'
import LinkButton from 'components/common/LinkButton'

import InfoRequestGrid from './InfoRequestGrid'

export default function AdminPage() {
  const { t } = useTranslation()
  const { keycloak } = useKeycloak<KeycloakInstance>()

  if (!keycloak?.authenticated) {
    return <Layout title={t('nav.admin.index')}>Not authenticated</Layout>
  }

  if (!isAdmin(keycloak)) {
    return <Layout title={t('nav.admin.index')}>Not authorized</Layout>
  }

  return (
    <Layout title={t('nav.admin.index')}>
      <Container maxWidth="lg">
        <LinkButton variant="contained" color="primary" href={routes.admin.infoRequests}>
          Info requests
        </LinkButton>
        <LinkButton variant="contained" color="primary" href={routes.admin.supporters}>
          Supporters
        </LinkButton>

        <div style={{ height: '50vh', width: '100%', marginTop: '1rem' }}>
          <InfoRequestGrid />
        </div>
      </Container>
    </Layout>
  )
}
