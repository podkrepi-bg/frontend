import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { CampaignResponse } from 'gql/campaigns'
import { coordinatorCampaignPictureUrl } from 'common/util/campaignImageUrls'
import { Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const PREFIX = 'CampaignInfo'

const classes = {
  coordinatorAvatar: `${PREFIX}-coordinatorAvatar`,
  campaignDate: `${PREFIX}-campaignDate`,
  linkButton: `${PREFIX}-linkButton`,
  organizerWrapper: `${PREFIX}-organizerWrapper`,
  trustedButton: `${PREFIX}-trustedButton`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.coordinatorAvatar}`]: {
    borderRadius: '50%',
  },

  [`& .${classes.campaignDate}`]: {
    fontSize: theme.spacing(2),
  },

  [`& .${classes.linkButton}`]: {
    color: theme.palette.primary.main,
    padding: 0,
    '&:hover': {
      backgroundColor: 'unset',
    },
  },

  [`& .${classes.organizerWrapper}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  [`& .${classes.trustedButton}`]: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontSize: theme.spacing(2),
    '&:hover': {
      backgroundColor: 'unset',
      textDecoration: 'underline',
    },
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
      <Grid container gap={3} alignItems="flex-start">
        <Image
          src={coordinatorAvatarSource}
          alt={campaign.title}
          width={100}
          height={100}
          className={classes.coordinatorAvatar}
        />
        <Grid className={classes.organizerWrapper}>
          <Typography variant="subtitle2" component="p">
            <strong>{t('campaigns:campaign.coordinator.name')}</strong>
          </Typography>
          <Typography variant="subtitle2" component="p">
            {campaign.coordinator.person.firstName} {campaign.coordinator.person.lastName}
          </Typography>{' '}
          <Button href={''} className={classes.linkButton}>
            {t('common:cta.see-profile')}
          </Button>
          <Grid container alignItems="center">
            <ThumbUpIcon color="action" />
            <Button href={''} className={classes.trustedButton}>
              {t('campaigns:cta.trusted')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
