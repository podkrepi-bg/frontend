import React from 'react'

import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { CampaignResponse } from 'gql/campaigns'

import { Button, Grid, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import { styled } from '@mui/material/styles'

import { organizerCampaignPictureUrl } from 'common/util/campaignImageUrls'

const PREFIX = 'CampaignInfoOrganizer'

const classes = {
  infoButtonIcon: `${PREFIX}-infoButtonIcon`,
  personAvatar: `${PREFIX}-personAvatar`,
  avatarWrapper: `${PREFIX}-avatarWrapper`,
  trustedButton: `${PREFIX}-trustedButton`,
  organizer: `${PREFIX}-organizer`,
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

  [`& .${classes.infoButtonIcon}`]: {
    marginRight: theme.spacing(1),
  },

  [`& .${classes.organizer}`]: {
    fontSize: theme.typography.pxToRem(14),
    fontWight: 700,
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
        <Typography variant="subtitle2" component="p" className={classes.organizer}>
          {t('campaigns:campaign.organizer.name')}
        </Typography>
        <Typography variant="subtitle2" component="p" className={classes.organizer}>
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
      </Grid>
    </StyledGrid>
  )
}
