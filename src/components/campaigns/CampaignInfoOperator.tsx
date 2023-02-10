import React from 'react'

import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { CampaignResponse } from 'gql/campaigns'

import { Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import EmailIcon from '@mui/icons-material/Email'

import { coordinatorCampaignPictureUrl } from 'common/util/campaignImageUrls'

const PREFIX = 'CampaignInfoOperator'

const classes = {
  infoButtonWrapper: `${PREFIX}-infoButtonWrapper`,
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
    maxHeight: '100%',
  },

  [`& .${classes.trustedButton}`]: {
    color: theme.palette.common.black,
    textDecoration: 'underline',
    fontSize: theme.typography.pxToRem(16),
    padding: theme.spacing(0, 0.37),

    '&:hover': {
      backgroundColor: 'unset',
      textDecoration: 'underline',
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

export default function CampaignInfoOperator({ campaign }: Props) {
  const { t } = useTranslation()

  const coordinatorAvatarSource = coordinatorCampaignPictureUrl(campaign)

  return (
    <StyledGrid container gap={3} mb={8}>
      <Grid item className={classes.avatarWrapper} minWidth="max-content" flex={1}>
        <Image
          src={coordinatorAvatarSource}
          //  A11Y TODO: Translate alt text
          alt={`Image of ${campaign.coordinator.person.firstName} ${campaign.coordinator.person.lastName}`}
          width={84}
          height={84}
          className={classes.personAvatar}
        />
      </Grid>
      <Grid item flex={6}>
        <Typography variant="subtitle2" component="p">
          <strong>{t('campaigns:campaign.podkrepi-bg-operator')}</strong>
        </Typography>
        <Typography variant="subtitle2" component="p">
          {campaign.coordinator.person.firstName} {campaign.coordinator.person.lastName}
        </Typography>
        <Typography variant="subtitle2" component="p">
          {t('campaigns:campaign.have-a-question')}
        </Typography>
        <Button
          startIcon={<EmailIcon color="action" />}
          href={
            'mailto:' +
            campaign.coordinator.person.email +
            '?subject=Question about: ' +
            campaign.title
          }
          className={classes.trustedButton}>
          {t('campaigns:campaign.btn-connect')}
        </Button>
      </Grid>
    </StyledGrid>
  )
}
