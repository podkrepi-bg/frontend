import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import Layout from 'components/client/layout/Layout'

import CampaignForm from './CampaignForm'

export default function CreateCampaignPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('nav.campaigns.index')} metaDescription={t('campaigns:form-heading')}>
      <Container maxWidth="sm">
        <CampaignForm />
      </Container>
    </Layout>
  )
}
