import React from 'react'
import { CampaignResponse } from 'gql/campaigns'

import { Grid } from '@mui/material'

import CampaignInfoBeneficiary from './CampaignInfoBeneficiary/CampaignInfoBeneficiary'
import CampaignInfoOrganizer from './CampaignInfoOrganizer'
import CampaignInfoStatus from './CampaignInfoStatus/CampaignInfoStatus'

type Props = {
  campaign: CampaignResponse
  showExpensesLink: boolean
}

export default function CampaignInfo({ campaign }: Props) {
  return (
    <Grid mb={5}>
      <Grid sx={{ display: 'flex' }}>
        <CampaignInfoBeneficiary campaign={campaign} />
        <CampaignInfoOrganizer campaign={campaign} />
      </Grid>
      <CampaignInfoStatus showExpensesLink campaign={campaign} />
    </Grid>
  )
}
