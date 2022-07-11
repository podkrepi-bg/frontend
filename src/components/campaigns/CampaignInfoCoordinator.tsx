import React from 'react'
import { useTranslation } from 'next-i18next'

import Image from 'next/image'
import { CampaignResponse } from 'gql/campaigns'
import { coordinatorCampaignPictureUrl } from 'common/util/campaignImageUrls'
import { Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import EmailIcon from '@mui/icons-material/Email'

const PREFIX = 'CampaignInfoCoordinator'

const classes = {
  coordinatorWrapper: `${PREFIX}-coordinatorWrapper`,
  infoButtonWrapper: `${PREFIX}-infoButtonWrapper`,
  personAvatar: `${PREFIX}-personAvatar`,
  avatarWrapper: `${PREFIX}-avatarWrapper`,
  linkButton: `${PREFIX}-linkButton`,
  trustedButton: `${PREFIX}-trustedButton`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.coordinatorWrapper}`]: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
  },

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
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontSize: '14px',
    padding: 0,
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

export default function CampaignInfoCoordinator({ campaign }: Props) {
  const { t } = useTranslation()

  const coordinatorAvatarSource = coordinatorCampaignPictureUrl(campaign)

  return (
    <StyledGrid container gap={3} className={classes.coordinatorWrapper}>
      <Grid item className={classes.avatarWrapper}>
        <Image
          src={coordinatorAvatarSource}
          alt={campaign.title}
          width="100px"
          height="100px"
          className={classes.personAvatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" component="p">
          <strong>{t('campaigns:campaign.podkrepi-bg-coordinator')}</strong>
        </Typography>
        <Typography variant="subtitle2" component="p">
          {campaign.coordinator.person.firstName} {campaign.coordinator.person.lastName}
        </Typography>
        <Typography variant="subtitle2" component="p">
          {t('campaigns:campaign.have-a-question')}
        </Typography>
        <Button
          startIcon={<EmailIcon color="action" />}
          href={'mailto:info@podkrepi.bg?subject=Question about: ' + campaign.title}
          className={classes.trustedButton}>
          info@podkrepi.bg
        </Button>
      </Grid>
    </StyledGrid>
  )
}
