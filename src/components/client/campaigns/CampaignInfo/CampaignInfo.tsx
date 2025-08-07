import React from 'react'
import { CampaignResponse } from 'gql/campaigns'

import { Grid2 } from '@mui/material'

import CampaignInfoBeneficiary from './CampaignInfoBeneficiary'
import CampaignInfoOrganizer from './CampaignInfoOrganizer'
import CampaignInfoStatus from './CampaignInfoStatus'
import { BeneficiaryOrganizerWrapper } from './CampaignInfo.styled'

type Props = {
  campaign: CampaignResponse
  showExpensesLink: boolean
}

export default function CampaignInfo({ campaign, showExpensesLink }: Props) {
  return (
    <Grid2 mb={5}>
      <CampaignInfoStatus showExpensesLink={showExpensesLink} campaign={campaign} />
      <BeneficiaryOrganizerWrapper>
        <CampaignInfoBeneficiary campaign={campaign} />
        <CampaignInfoOrganizer campaign={campaign} />
      </BeneficiaryOrganizerWrapper>
    </Grid2>
  )
}
