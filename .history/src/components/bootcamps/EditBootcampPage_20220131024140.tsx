import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import Layout from 'components/layout/Layout'
import BootcampEditForm from './BootcampEditForm'

// import CampaignForm from './CampaignForm'

export default function EditBootcampPage() {
  const { t } = useTranslation()

  return (
    <>
      title={t('Промени бууткемп')}
      githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/campaigns/CreateCampaignPage.tsx"
      figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5055%3A21345">
      <Container maxWidth="sm">
        <BootcampEditForm />
      </Container>
    </>
  )
}
