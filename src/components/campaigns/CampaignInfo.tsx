import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { CampaignResponse } from 'gql/campaigns'
import { coordinatorCampaignPictureUrl } from 'common/util/campaignImageUrls'
import { Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import FavoriteIcon from '@mui/icons-material/Favorite'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import Divider from '@mui/material/Divider'

const PREFIX = 'CampaignInfo'

const classes = {
  coordinatorAvatar: `${PREFIX}-coordinatorAvatar`,
  campaignText: `${PREFIX}-campaignText`,
  linkButton: `${PREFIX}-linkButton`,
  organizerOperatorWrapper: `${PREFIX}-organizerOperatorWrapper`,
  trustedButton: `${PREFIX}-trustedButton`,
  campaignInfoIcon: `${PREFIX}-campaignInfoIcon`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.coordinatorAvatar}`]: {
    borderRadius: '50%',
  },

  [`& .${classes.campaignText}`]: {
    fontSize: theme.spacing(2),
  },

  [`& .${classes.linkButton}`]: {
    color: theme.palette.primary.main,
    padding: 0,
    '&:hover': {
      backgroundColor: 'unset',
    },
  },

  [`& .${classes.organizerOperatorWrapper}`]: {
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

  [`& .${classes.campaignInfoIcon}`]: {
    marginRight: theme.spacing(1),
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
    <StyledGrid mb={5}>
      <Grid container justifyContent="space-between" mb={4}>
        <Typography
          variant="subtitle2"
          component="p"
          display="flex"
          className={classes.campaignText}>
          <FavoriteIcon color="action" className={classes.campaignInfoIcon} />
          {/* TODO: get data from endpoint */}
          <strong>Социална Подкрепа</strong>
        </Typography>
        <Typography
          variant="subtitle2"
          component="p"
          display="flex"
          className={classes.campaignText}>
          <WhatshotIcon color="action" className={classes.campaignInfoIcon} />
          {/* TODO: get data from endpoint */}
          <strong>{t('campaigns:campaign.profile')}</strong> Спешна
        </Typography>
        <Typography variant="subtitle2" component="p" className={classes.campaignText}>
          <strong>{t('campaigns:campaign.status')}</strong> {campaign.state}
        </Typography>
        <Grid container justifyContent="space-between">
          <Typography variant="subtitle2" component="p" className={classes.campaignText}>
            <strong>{t('campaigns:campaign.start-date')}</strong> {formattedStartDate}
          </Typography>
          <Typography variant="subtitle2" component="p" className={classes.campaignText}>
            <strong>{t('campaigns:campaign.end-date')}</strong> {formattedEndDate}
          </Typography>
        </Grid>
      </Grid>
      <Grid container flexDirection="row" flexWrap="initial">
        <Grid container gap={3} alignItems="flex-start">
          <Image
            src={coordinatorAvatarSource}
            alt={campaign.title}
            width={100}
            height={100}
            className={classes.coordinatorAvatar}
          />
          <Grid className={classes.organizerOperatorWrapper}>
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
        <Divider sx={{ borderRightWidth: 2, marginRight: '15px' }} />
        <Grid container gap={3} alignItems="flex-start">
          <Image
            src={coordinatorAvatarSource}
            alt={campaign.title}
            width={100}
            height={100}
            className={classes.coordinatorAvatar}
          />
          <Grid className={classes.organizerOperatorWrapper}>
            <Typography variant="subtitle2" component="p">
              <strong>{t('campaigns:campaign.operator')}</strong>
            </Typography>
            <Typography variant="subtitle2" component="p">
              {/* TODO: get data from endpoint */}
              {campaign.coordinator.person.firstName} {campaign.coordinator.person.lastName}
            </Typography>{' '}
            <Button href={''} className={classes.linkButton}>
              {t('common:cta.question')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
