import React from 'react'
import { useTranslation } from 'next-i18next'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { Container, Grid, Typography } from '@mui/material'

import { isAdmin } from 'common/util/roles'
import Layout from 'components/layout/Layout'

import SupportersGrid from './SupportersGrid'
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
      <Container maxWidth="xl">
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h3">{t('nav.admin.info-requests')}</Typography>
          </Grid>
          <Grid item>
            <InfoRequestGrid />
          </Grid>
          <Grid item>
            <Typography variant="h3">{t('nav.admin.supporters')}</Typography>
          </Grid>
          <Grid item>
            <SupportersGrid />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}
