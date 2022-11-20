import React from 'react'
import { useTranslation } from 'next-i18next'

import Image from 'next/image'
import { CampaignResponse } from 'gql/campaigns'
import { organizerCampaignPictureUrl } from 'common/util/campaignImageUrls'
import { Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import EmailIcon from '@mui/icons-material/Email'

const PREFIX = 'CampaignInfoOrganizer'

const classes = {
  infoButtonWrapper: `${PREFIX}-infoButtonWrapper`,
  infoButtonIcon: `${PREFIX}-infoButtonIcon`,
  personAvatar: `${PREFIX}-personAvatar`,
  avatarWrapper: `${PREFIX}-avatarWrapper`,
  linkButton: `${PREFIX}-linkButton`,
  trustedButton: `${PREFIX}-trustedButton`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.avatarWrapper}`]: {
    paddingLeft: theme.spacing(2.5),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(0),
    },
  },

  [`& .${classes.personAvatar}`]: {
    borderRadius: '50%',
    objectFit: 'cover',
  },

  [`& .${classes.linkButton}`]: {
    color: theme.palette.primary.main,
    padding: 0,
    '&:hover': {
      backgroundColor: 'unset',
    },
  },

  [`& .${classes.trustedButton}`]: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontSize: theme.spacing(1.75),
    padding: 0,
    paddingLeft: 2,
    '&:hover': {
      backgroundColor: 'unset',
      textDecoration: 'underline',
    },
  },

  [`& .${classes.infoButtonWrapper}`]: {
    justifyContent: 'start',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'start',
    },
  },
  [`& .${classes.infoButtonIcon}`]: {
    marginRight: theme.spacing(1),
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default function CampaignInfoOrganizer({ campaign }: Props) {
  const { t } = useTranslation()

  const organizerAvatarSource = organizerCampaignPictureUrl(campaign)

  return (
    <StyledGrid container item gap={3}>
      <Grid item className={classes.avatarWrapper} minWidth="max-content" flex={1}>
        <Image
          src={organizerAvatarSource}
          //  A11Y TODO: Translate alt text
          alt={`Image of ${campaign.organizer?.person.firstName} ${campaign.organizer?.person.lastName}`}
          width={100}
          height={100}
          className={classes.personAvatar}
        />
      </Grid>
      <Grid item flex={6}>
        <Typography variant="subtitle2" component="p">
          <strong>{t('campaigns:campaign.organizer.name')}</strong>
        </Typography>
        <Typography variant="subtitle2" component="p">
          {campaign.organizer?.person.firstName || ''} {campaign.organizer?.person.lastName || ''}
        </Typography>
        <Button
          startIcon={<EmailIcon color="action" />}
          href={
            'mailto:' +
            campaign?.organizer?.person.email +
            '?subject=Question about: ' +
            campaign.title
          }
          className={classes.trustedButton}>
          {campaign?.organizer?.person.email}
        </Button>
        {/*TODO: No current implementation of organizer profile */}
        {/* <Button href={''} className={classes.linkButton}>
          {t('common:cta.see-profile')}
        </Button> */}
        <Grid container alignItems="center" className={classes.infoButtonWrapper}>
          <ThumbUpIcon color="success" className={classes.infoButtonIcon} />
          <Typography variant="subtitle2" component="p">
            {t('campaigns:cta.trusted')}
          </Typography>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
