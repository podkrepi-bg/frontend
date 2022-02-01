import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import Layout from 'components/layout/Layout'
import BootcampForm from './BootcampForm'

// import CampaignForm from './CampaignForm'

export default function CreateBootcampPage() {
  const { t } = useTranslation()

  return (
    <Layout
      title={t('Създай нов бууткемп')}
      ">
      <Container maxWidth="sm">
        <BootcampForm />
      </Container>
    </Layout>
  )
}
