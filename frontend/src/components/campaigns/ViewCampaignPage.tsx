import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, CircularProgress, Container, Typography } from '@material-ui/core'

import NotFoundPage from 'pages/404'
import Layout from 'components/layout/Layout'
import { useViewCampaign } from 'common/hooks/campaigns'

type Props = { slug: string }
export default function ViewCampaignPage({ slug }: Props) {
  const { t } = useTranslation()
  const { data, isLoading } = useViewCampaign(slug)

  if (!data || !data.campaign) return <NotFoundPage />

  const { campaign } = data
  return (
    <Layout title={campaign.title}>
      <Container maxWidth="lg">
        <Box textAlign="center" marginBottom={4}>
          <Typography>{t('campaigns:campaign.tag')}</Typography>
          <Typography>{t('campaigns:campaign.date')}</Typography>
        </Box>
        {isLoading && <CircularProgress size="large" />}
        <pre>{JSON.stringify(campaign, null, 2)}</pre>
      </Container>
    </Layout>
  )
}
