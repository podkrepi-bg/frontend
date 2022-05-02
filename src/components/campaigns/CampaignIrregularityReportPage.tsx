import React from 'react'
import { useViewCampaign } from 'common/hooks/campaigns'
import Layout from 'components/layout/Layout'
import NotFoundPage from 'pages/404'
import { Container } from '@mui/material'
import IrregularityReportForm from 'components/irregularity-report/IrregularityReportForm'

type Props = { slug: string }

export default function ViewCampaignPage({ slug }: Props) {
  const { data } = useViewCampaign(slug)
  if (!data || !data.campaign) return <NotFoundPage />
  const { campaign } = data

  return (
    <Layout maxWidth={false}>
      <Container maxWidth="md">
        <IrregularityReportForm campaign={campaign} />
      </Container>
    </Layout>
  )
}
