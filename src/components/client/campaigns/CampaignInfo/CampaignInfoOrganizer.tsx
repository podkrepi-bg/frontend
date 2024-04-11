import React from 'react'
import { CampaignResponse } from 'gql/campaigns'
import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'

import { organizerCampaignPictureUrl } from 'common/util/campaignImageUrls'

import { Avatar, BeneficiaryOrganizerRoot, EmailButton, Label } from './CampaignInfo.styled'

type Props = {
  campaign: CampaignResponse
}

export default function CampaignInfoOrganizer({ campaign }: Props) {
  const { t } = useTranslation()
  const organizerAvatarSource = organizerCampaignPictureUrl(campaign)

  return (
    <BeneficiaryOrganizerRoot>
      <Grid>
        <Label variant="subtitle2">{t('campaigns:campaign.organizer.name')}</Label>
        <Typography variant="subtitle2" component="p">
          {campaign.organizer?.person.firstName || ''} {campaign.organizer?.person.lastName || ''}
        </Typography>
        <EmailButton
          startIcon={<EmailIcon color="action" />}
          href={
            'mailto:' +
            campaign?.organizer?.person.email +
            '?subject=Question about: ' +
            campaign.title
          }>
          {campaign?.organizer?.person.email}
        </EmailButton>
      </Grid>
      <Avatar
        src={organizerAvatarSource}
        alt={`${t('campaign.image-of')}  ${campaign.organizer?.person.firstName} ${
          campaign.organizer?.person.lastName
        }`}
        width={100}
        height={100}
      />
    </BeneficiaryOrganizerRoot>
  )
}
