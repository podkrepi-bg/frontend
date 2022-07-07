import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { CampaignResponse } from 'gql/campaigns'
import { coordinatorCampaignPictureUrl } from 'common/util/campaignImageUrls'
import { Button, Grid, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EmailIcon from '@mui/icons-material/Email'
import { getExactDate } from 'common/util/date'

const PREFIX = 'CampaignInfo'

const classes = {
  organizerOperatorWrapper: `${PREFIX}-organizerOperatorWrapper`,
  organizerOperatorInfo: `${PREFIX}-organizerOperatorInfo`,
  infoBlockWrapper: `${PREFIX}-infoBlockWrapper`,
  infoButtonWrapper: `${PREFIX}-infoButtonWrapper`,
  coordinatorAvatar: `${PREFIX}-coordinatorAvatar`,
  campaignText: `${PREFIX}-campaignText`,
  linkButton: `${PREFIX}-linkButton`,
  trustedButton: `${PREFIX}-trustedButton`,
  divider: `${PREFIX}-divider`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.coordinatorAvatar}`]: {
    borderRadius: '50%',
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

  [`& .${classes.organizerOperatorWrapper}`]: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'initial',
    },
  },

  [`& .${classes.organizerOperatorInfo}`]: {
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
    fontSize: theme.spacing(2),
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
  const { t } = useTranslation()

  const coordinatorAvatarSource = coordinatorCampaignPictureUrl(campaign)

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
          <strong>{t('campaigns:campaign.status')}</strong> {campaign.state}
        </Typography>
        <Grid container justifyContent="space-between">
          <Typography variant="subtitle2" component="p" className={classes.campaignText}>
            <strong>{t('campaigns:campaign.start-date')}</strong> {getExactDate(campaign.startDate)}
          </Typography>
          <Typography variant="subtitle2" component="p" className={classes.campaignText}>
            <strong>{t('campaigns:campaign.end-date')}</strong>{' '}
            {campaign.endDate ? getExactDate(campaign.endDate) : 'не е въведена'}
          </Typography>
        </Grid>
      </Grid>
      <Grid container gap={2} className={classes.organizerOperatorWrapper}>
        <Grid container gap={3} className={classes.infoBlockWrapper}>
          <Image
            src={coordinatorAvatarSource}
            alt={campaign.title}
            width={100}
            height={100}
            className={classes.coordinatorAvatar}
          />
          <Grid className={classes.organizerOperatorInfo}>
            <Typography variant="subtitle2" component="p">
              <strong>{t('campaigns:campaign.coordinator.name')}</strong>
            </Typography>
            <Typography variant="subtitle2" component="p">
              {campaign.coordinator.person.firstName} {campaign.coordinator.person.lastName}
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
            className={classes.coordinatorAvatar}
          />
          <Grid className={classes.organizerOperatorInfo}>
            <Typography variant="subtitle2" component="p">
              <strong>{t('campaigns:campaign.operator')}</strong>
            </Typography>
            <Typography variant="subtitle2" component="p">
              {/* TODO: get operator data from endpoint */}
              {campaign.coordinator.person.firstName} {campaign.coordinator.person.lastName}
            </Typography>
            <Button href={''} className={classes.linkButton}>
              {t('common:cta.question')}
            </Button>
            <Grid container alignItems="center" className={classes.infoButtonWrapper}>
              <EmailIcon color="action" />
              <Button href={''} className={classes.trustedButton}>
                {t('campaigns:campaign.write-to-operator')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
