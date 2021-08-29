import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@material-ui/core'

import Layout from 'components/layout/Layout'

import CampaignForm from './CampaignForm'

export default function CreateCampaignPage() {
  const { t } = useTranslation()

  return (
    <Layout
      title={t('nav.campaigns.index')}
      editLink="https://github.com/podkrepi-bg/frontend/tree/master/frontend/src/components/campaigns/CreateCampaignPage.tsx">
      <Container maxWidth="sm">
        <CampaignForm />
      </Container>
    </Layout>
  )
}
