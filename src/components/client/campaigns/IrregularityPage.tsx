import React from 'react'

import { Container } from '@mui/material'

import { useViewCampaign } from 'common/hooks/campaigns'
import { useCurrentPerson } from 'common/util/useCurrentPerson'
import Layout from 'components/client/layout/Layout'
import IrregularityForm from 'components/client/irregularity/helpers/IrregularityForm'
import CenteredSpinner from 'components/common/CenteredSpinner'

type Props = { slug: string }

export default function IrregularityPage({ slug }: Props) {
  const { data, isLoading } = useViewCampaign(slug)
  const { data: userData } = useCurrentPerson()
  if (isLoading || !data) return <CenteredSpinner size="2rem" />

  const person = userData?.user || undefined

  return (
    <Layout maxWidth={false}>
      <Container maxWidth="md">
        <IrregularityForm campaign={data.campaign} person={person} />
      </Container>
    </Layout>
  )
}
