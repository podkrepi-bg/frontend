import React from 'react'

import { Container } from '@mui/material'

import { useViewCampaign } from 'common/hooks/campaigns'

import NotFoundPage from 'pages/404'
import Layout from 'components/layout/Layout'
import CampaignReportForm from 'components/irregularity-report/CampaignReportForm'

type Props = { slug: string }

export default function CampaignReportPage({ slug }: Props) {
  const { data } = useViewCampaign(slug)
  if (!data || !data.campaign) return <NotFoundPage />
  const { campaign } = data

  return (
    <Layout maxWidth={false}>
      <Container maxWidth="md">
        <CampaignReportForm campaign={campaign} />
      </Container>
    </Layout>
  )
}
