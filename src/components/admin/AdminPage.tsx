import React from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Container, Grid, Typography } from '@mui/material'

// import { isAdmin } from 'common/util/roles'
import Layout from 'components/layout/Layout'

import InfoRequestGrid from './InfoRequestGrid'
import SupportersGrid from './SupportersGrid'

export default function AdminPage() {
  const { t } = useTranslation()
  const { status } = useSession()

  if (status !== 'authenticated') {
    return <Layout title={t('nav.admin.index')}>Not authenticated</Layout>
  }

  // if (!isAdmin(keycloak)) {
  //   return <Layout title={t('nav.admin.index')}>Not authorized</Layout>
  // }

  return (
    <Layout title={t('nav.admin.index')}>
      <Container maxWidth="xl">
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h3">{t('nav.admin.info-request')}</Typography>
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
