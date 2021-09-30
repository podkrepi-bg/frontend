import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Container } from '@material-ui/core'

import { routes } from 'common/routes'
import Layout from 'components/layout/Layout'
import LinkButton from 'components/common/LinkButton'

import CampaignsList from './CampaignsList'

export default function CampaignsPage() {
  const { t } = useTranslation()
  return (
    <Layout
      title={t('nav.campaigns.index')}
      githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/campaigns/CampaignsPage.tsx"
      figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5100%3A21216">
      <Container maxWidth="lg">
        <Box textAlign="center" marginBottom={4}>
          <LinkButton href={routes.campaigns.create} variant="outlined" size="large">
            {t('nav.campaigns.create')}
          </LinkButton>
        </Box>
        <CampaignsList />
      </Container>
    </Layout>
  )
}
