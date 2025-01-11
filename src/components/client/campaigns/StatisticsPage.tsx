import React from 'react'

import { Container, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { useViewCampaign } from 'common/hooks/campaigns'
import Layout from 'components/client/layout/Layout'
import NotFoundPage from 'pages/404'
import CumulativeDonationsChart from './CampaignStatistics/CumulativeDonationsChart'
import GroupedDonationsChart from './CampaignStatistics/GroupedDonationsChart'
import UniqueDonationsChart from './CampaignStatistics/UniqueDonationsChart'
import HourlyDonationsChart from './CampaignStatistics/HourlyDonationsChart'
import Link from 'components/common/Link'
import { routes } from 'common/routes'

type Props = { slug: string }

export default function StatisticsPage({ slug }: Props) {
  const { t } = useTranslation()
  const { data: campaignResponse, isLoading, isError } = useViewCampaign(slug)
  if (isLoading || !campaignResponse) return <>{isError && <NotFoundPage />}</>

  const campaign = campaignResponse.campaign
  const campaignTitle = campaign.title
  const hasDonations = !!campaign.summary.reachedAmount

  return (
    <Layout maxWidth={false} metaTitle={campaignTitle} metaDescription={campaignTitle}>
      <Container maxWidth="lg">
        <Link href={routes.campaigns.viewCampaignBySlug(slug)}>
          <Typography>{t('campaigns:statistics.backButton')}</Typography>
        </Link>
        <Stack sx={{ marginBottom: '30px' }}>
          <Typography variant="h4" component="h1">
            {campaignTitle}
          </Typography>
          <Typography variant="caption">{t('campaigns:statistics.cachedMessage')}</Typography>
        </Stack>
        {hasDonations && (
          <Stack sx={{ gap: 50 }}>
            <CumulativeDonationsChart
              campaignId={campaign.id}
              startDate={campaign.startDate}
              endDate={campaign.endDate}
              targetAmount={campaign.targetAmount}
            />
            <GroupedDonationsChart
              campaignId={campaign.id}
              startDate={campaign.startDate}
              endDate={campaign.endDate}
            />
            <UniqueDonationsChart campaignId={campaign.id} />
            <HourlyDonationsChart campaignId={campaign.id} />
          </Stack>
        )}
      </Container>
    </Layout>
  )
}
