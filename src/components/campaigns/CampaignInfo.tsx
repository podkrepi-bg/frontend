import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { CampaignResponse } from 'gql/campaigns'
import { coordinatorCampaignPictureUrl } from 'common/util/campaignImageUrls'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const PREFIX = 'CampaignInfo'

const classes = {
  coordinatorAvatar: `${PREFIX}-coordinatorAvatar`,
  campaignDate: `${PREFIX}-campaignDate`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.coordinatorAvatar}`]: {
    borderRadius: '50%',
  },

  [`& .${classes.campaignDate}`]: {
    fontSize: theme.spacing(2),
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default function CampaignInfo({ campaign }: Props) {
  const { t } = useTranslation()

  const coordinatorAvatarSource = coordinatorCampaignPictureUrl(campaign)

  const startDate = new Date(campaign.startDate)
  const formattedStartDate = startDate.toLocaleDateString('bg-BG', {
    day: 'numeric',
    month: 'long',
    year: '2-digit',
  })

  const endDate = new Date(campaign.endDate)
  const formattedEndDate = endDate.toLocaleDateString('bg-BG', {
    day: 'numeric',
    month: 'long',
    year: '2-digit',
  })

  return (
    <StyledGrid justifyContent="space-between" mb={5}>
      <Grid container mb={4}>
        <Grid container justifyContent="space-between">
          <Typography variant="subtitle2" component="p" className={classes.campaignDate}>
            <strong>{t('campaigns:campaign.start-date')}</strong> {formattedStartDate}
          </Typography>
          <Typography variant="subtitle2" component="p" className={classes.campaignDate}>
            <strong>{t('campaigns:campaign.end-date')}</strong> {formattedEndDate}
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" gap={5}>
        <Image
          src={coordinatorAvatarSource}
          alt={campaign.title}
          width={100}
          height={100}
          className={classes.coordinatorAvatar}
        />
        <Typography variant="h6" component="h6">
          {t('campaigns:campaign.coordinator.name')}
        </Typography>
        <Typography variant="h6" component="h6">
          {campaign.coordinator.person.firstName} {campaign.coordinator.person.lastName}
        </Typography>
      </Grid>
    </StyledGrid>
  )
}
