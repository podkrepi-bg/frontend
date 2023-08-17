import React from 'react'
import { CampaignResponse } from 'gql/campaigns'

import { Stack, Grid } from '@mui/material'

import CampaignInfoBeneficiary from './CampaignInfoBeneficiary'
import CampaignInfoOrganizer from './CampaignInfoOrganizer'
import CampaignInfoStatus from './CampaignInfoStatus/CampaignInfoStatus'

type Props = {
  campaign: CampaignResponse
  showExpensesLink: boolean
}

export default function CampaignInfo({ campaign }: Props) {
  return (
    <Grid mb={5}>
      <Stack direction="row" mb={5}>
        <CampaignInfoBeneficiary campaign={campaign} />
        <CampaignInfoOrganizer campaign={campaign} />
      </Stack>
      <CampaignInfoStatus showExpensesLink campaign={campaign} />
    </Grid>
  )
}
