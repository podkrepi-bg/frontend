import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Container, Typography } from '@material-ui/core'
import Layout from 'components/layout/Layout'

export default function CampaignPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('campaigns:campaign.title')}>
      <Container maxWidth="lg">
        <Box textAlign="center" marginBottom={4}>
          <Typography>{t('campaigns:campaign.tag')}</Typography>
          <Typography>{t('campaigns:campaign.date')}</Typography>
        </Box>
      </Container>
    </Layout>
  )
}
