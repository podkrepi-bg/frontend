import React from 'react'
import { useTranslation } from 'next-i18next'
import { bg, enUS } from 'date-fns/locale'

import Image from 'next/image'
import { CampaignResponse } from 'gql/campaigns'
import {
  coordinatorCampaignPictureUrl,
  organizerCampaignPictureUrl,
} from 'common/util/campaignImageUrls'
import { Button, Grid, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EmailIcon from '@mui/icons-material/Email'
import { getExactDate } from 'common/util/date'

const PREFIX = 'CampaignInfo'

const classes = {
  personWrapper: `${PREFIX}-personWrapper`,
  personInfo: `${PREFIX}-personInfo`,
  infoBlockWrapper: `${PREFIX}-infoBlockWrapper`,
  infoButtonWrapper: `${PREFIX}-infoButtonWrapper`,
  personAvatar: `${PREFIX}-personAvatar`,
  campaignText: `${PREFIX}-campaignText`,
  linkButton: `${PREFIX}-linkButton`,
  trustedButton: `${PREFIX}-trustedButton`,
  divider: `${PREFIX}-divider`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.personAvatar}`]: {
    borderRadius: '50%',
    objectFit: 'cover',
  },

  [`& .${classes.campaignText}`]: {
    fontSize: theme.spacing(2),
    flexWrap: 'wrap',
  },

  [`& .${classes.linkButton}`]: {
    color: theme.palette.primary.main,
    padding: 0,
    '&:hover': {
      backgroundColor: 'unset',
    },
  },

  [`& .${classes.personWrapper}`]: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'initial',
    },
  },

  [`& .${classes.personInfo}`]: {
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      width: 'initial',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  [`& .${classes.trustedButton}`]: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontSize: '14px',
    padding: 0,
    '&:hover': {
      backgroundColor: 'unset',
      textDecoration: 'underline',
    },
  },

  [`& .${classes.divider}`]: {
    borderRightWidth: 2,
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
      margin: 0,
    },
  },

  [`& .${classes.infoBlockWrapper}`]: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'start',
    },
  },

  [`& .${classes.infoButtonWrapper}`]: {
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'start',
    },
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default function CampaignInfo({ campaign }: Props) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language == 'bg' ? bg : enUS

  const coordinatorAvatarSource = coordinatorCampaignPictureUrl(campaign)
  const organizerAvatarSource = organizerCampaignPictureUrl(campaign)

  return (
    <StyledGrid mb={5}>
      <Grid container justifyContent="space-between" mb={4}>
        <Typography
          variant="subtitle2"
          component="p"
          display="flex"
          gap="5px"
          pr={2}
          className={classes.campaignText}>
          <FavoriteIcon color="action" />
          <strong>{t('campaigns:campaign.type')}: </strong>
          {campaign.campaignType?.name}
        </Typography>
        {/* TODO: Dynamic campaign tagging is needed here based on activity (urgent, hot, the long-shot, etc) */}
        {/* <Typography
          variant="subtitle2"
          component="p"
          display="flex"
          className={classes.campaignText}>
          <WhatshotIcon color="action" />
          <strong>{t('campaigns:campaign.profile')}</strong>Спешна
        </Typography> */}
        <Typography variant="subtitle2" component="p" className={classes.campaignText}>
          <strong>{t('campaigns:campaign.status')}</strong>{' '}
          {t(`campaigns:campaign-status.${campaign.state}`)}
        </Typography>
        <Grid container justifyContent="space-between">
          <Typography variant="subtitle2" component="p" className={classes.campaignText}>
            <strong>{t('campaigns:campaign.start-date')}</strong>{' '}
            {getExactDate(campaign.startDate, locale)}
          </Typography>
          <Typography variant="subtitle2" component="p" className={classes.campaignText}>
            <strong>{t('campaigns:campaign.end-date')}</strong>{' '}
            {campaign.endDate ? getExactDate(campaign.endDate, locale) : 'не е въведена'}
          </Typography>
        </Grid>
      </Grid>
      <Grid container gap={2} className={classes.personWrapper}>
        <Grid container gap={3} className={classes.infoBlockWrapper}>
          <Image
            src={organizerAvatarSource}
            alt={campaign.title}
            width={100}
            height={100}
            className={classes.personAvatar}
          />
          <Grid className={classes.personInfo}>
            <Typography variant="subtitle2" component="p">
              <strong>{t('campaigns:campaign.organizer.name')}</strong>
            </Typography>
            <Typography variant="subtitle2" component="p">
              {campaign.organizer?.person.firstName || ''}{' '}
              {campaign.organizer?.person.lastName || ''}
            </Typography>{' '}
            <Button href={''} className={classes.linkButton}>
              {t('common:cta.see-profile')}
            </Button>
            <Grid container alignItems="center" className={classes.infoButtonWrapper}>
              <ThumbUpIcon color="action" />
              <Button href={''} className={classes.trustedButton}>
                {t('campaigns:cta.trusted')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container gap={3} className={classes.infoBlockWrapper}>
          <Image
            src={coordinatorAvatarSource}
            alt={campaign.title}
            width={100}
            height={100}
            className={classes.personAvatar}
          />
          <Grid className={classes.personInfo}>
            <Typography variant="subtitle2" component="p">
              <strong>{t('campaigns:campaign.podkrepi-bg-coordinator')}</strong>
            </Typography>
            <Typography variant="subtitle2" component="p">
              {/* TODO: get operator data from endpoint */}
              {campaign.coordinator.person.firstName} {campaign.coordinator.person.lastName}
            </Typography>
            <Button
              startIcon={<EmailIcon color="action" />}
              href={'mailto:info@podkrepi.bg?subject=Question about: ' + campaign.title}
              className={classes.trustedButton}>
              info@podkrepi.bg
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
