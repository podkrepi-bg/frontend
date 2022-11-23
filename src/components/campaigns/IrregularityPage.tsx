import React from 'react'

import { Container } from '@mui/material'

import { useViewCampaign } from 'common/hooks/campaigns'
import { useCurrentPerson } from 'common/util/useCurrentPerson'

import NotFoundPage from 'pages/404'
import Layout from 'components/layout/Layout'
import IrregularityForm from 'components/irregularity/IrregularityForm'

type Props = { slug: string }

export default function IrregularityPage({ slug }: Props) {
  const { data } = useViewCampaign(slug)
  const { data: userData } = useCurrentPerson()
  if (!data || !data.campaign) return <NotFoundPage />
  const { campaign } = data

  const person = userData?.user || undefined

  return (
    <Layout maxWidth={false}>
      <Container maxWidth="md">
        <IrregularityForm campaign={campaign} person={person} />
      </Container>
    </Layout>
  )
}
