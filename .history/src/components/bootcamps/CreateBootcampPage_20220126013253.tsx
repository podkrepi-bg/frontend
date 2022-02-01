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
      githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/campaigns/CreateCampaignPage.tsx"
      figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5055%3A21345">
      <Container maxWidth="sm">
      <Typography variant="h5" component="h2" className={classes.heading}>
          {t('campaigns:form-heading')}
        </Typography>
        <BootcampForm />
      </Container>
    </Layout>
  )
}
