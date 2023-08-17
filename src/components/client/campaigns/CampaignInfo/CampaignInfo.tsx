import React from 'react'
import { CampaignResponse } from 'gql/campaigns'

import { Grid } from '@mui/material'

import CampaignInfoBeneficiary from './CampaignInfoBeneficiary'
import CampaignInfoOrganizer from './CampaignInfoOrganizer'
import CampaignInfoStatus from './CampaignInfoStatus'
import { BeneficiaryOrganizerWrapper } from './CampaignInfo.styled'

type Props = {
  campaign: CampaignResponse
  showExpensesLink: boolean
}

export default function CampaignInfo({ campaign }: Props) {
  return (
    <Grid mb={5}>
      <BeneficiaryOrganizerWrapper>
        <CampaignInfoBeneficiary campaign={campaign} />
        <CampaignInfoOrganizer campaign={campaign} />
      </BeneficiaryOrganizerWrapper>
      <CampaignInfoStatus showExpensesLink campaign={campaign} />
    </Grid>
  )
}
