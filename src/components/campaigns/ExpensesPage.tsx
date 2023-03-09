import React from 'react'

import { Container } from '@mui/material'

import Layout from 'components/layout/Layout'

import CampaignExpensesGrid from '../campaign-expenses/grid/CampaignExpensesGrid'
import ExpensesGridAppbar from '../campaign-expenses/grid/CampaignGridAppbar'
import { useCanEditCampaign, useViewCampaign } from 'common/hooks/campaigns'
import { routes } from 'common/routes'

type Props = { slug: string }

export default function ExpensesPage({ slug }: Props) {
  const canEdit = useCanEditCampaign(slug)

  if (!canEdit) {
    return <Layout maxWidth={false} />
  }

  const { data: campaignResponse } = useViewCampaign(slug)
  const campaignTitle = campaignResponse?.campaign.title

  return (
    <Layout maxWidth={false}>
      <Container maxWidth="md">
        <h1>{campaignTitle}</h1>
        <ExpensesGridAppbar slug={slug} />
        <CampaignExpensesGrid slug={slug} />
      </Container>
    </Layout>
  )
}
