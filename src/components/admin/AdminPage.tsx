import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'

export default function CampaignsPage() {
  const { t } = useTranslation()
  return (
    <Layout title={t('nav.admin.index')}>
      <Container maxWidth="lg">
        {/* <CampaignsList /> */}
        <LinkButton href={routes.admin.infoRequests}>Info requests</LinkButton>
        <LinkButton href={routes.admin.supporters}>Supporters</LinkButton>
      </Container>
    </Layout>
  )
}
