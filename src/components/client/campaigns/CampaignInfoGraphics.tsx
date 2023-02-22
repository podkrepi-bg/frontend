import React from 'react'

import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'

const PREFIX = 'CampaignInfoGraphics'

const classes = {
  infoBlock: `${PREFIX}-infoBlock`,
  title: `${PREFIX}-title`,
  subtext: `${PREFIX}-subtext`,
  volunteerButton: `${PREFIX}-volunteerButton`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.infoBlock}`]: {
    display: 'block',
    textAlign: 'center',
    alignItems: 'center',
    padding: theme.spacing(0, 3, 5, 0),
    alignSelf: 'start',

    '&:last-of-type': {
      display: 'block',
      textAlign: 'center',
    },

    [theme.breakpoints.up('lg')]: {
      display: 'inline-flex',
      textAlign: 'initial',
    },
  },

  [`& .${classes.title}`]: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(16),
    marginBottom: theme.spacing(1),
    width: '100%',

    '&:last-of-type': {
      width: '100%',
    },

    [theme.breakpoints.up('lg')]: {
      width: theme.spacing(36),
    },
  },

  [`& .${classes.subtext}`]: {
    width: '100%',

    [theme.breakpoints.up('lg')]: {
      width: theme.spacing(36),
    },
  },

  [`& .${classes.volunteerButton}`]: {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.spacing(3),
    letterSpacing: theme.spacing(0.05),
    color: theme.palette.common.black,
    border: `2px solid ${theme.palette.secondary.main}`,
  },
}))

export default function CampaignInfoGraphics() {
  const { t } = useTranslation()

  const donationIconSource = '/img/donation-icon.png'
  const transparencyIconSource = '/img/transparency-icon.png'
  const approvalIconSource = '/img/approval-icon.png'

  return (
    <StyledGrid container pl={8}>
      <Grid item xs={12} lg={6} className={classes.infoBlock}>
        <Image alt="Donation icon" src={donationIconSource} width={90} height={100} />
        <Grid ml={1}>
          <Typography className={classes.title}>
            {t('campaigns:info-graphics.donation-title')}
          </Typography>
          <Typography className={classes.subtext}>
            {t('campaigns:info-graphics.donation-text')}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6} className={classes.infoBlock}>
        <Image alt="Transparency icon" src={transparencyIconSource} width={90} height={100} />
        <Grid ml={1}>
          <Typography className={classes.title}>
            {t('campaigns:info-graphics.transparency-title')}
          </Typography>
          <Typography className={classes.subtext}>
            {t('campaigns:info-graphics.transparency-text')}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6} className={classes.infoBlock}>
        <Image alt="Approval icon" src={approvalIconSource} width={90} height={100} />
        <Grid ml={1}>
          <Typography className={classes.title}>
            {t('campaigns:info-graphics.approval-title')}
          </Typography>
          <Typography className={classes.subtext}>
            {t('campaigns:info-graphics.approval-text')}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6} className={classes.infoBlock}>
        <Grid>
          <Typography className={classes.title}>
            {t('campaigns:info-graphics.become-volunteer-title')}
          </Typography>
          <Grid textAlign="center" mt={2}>
            <LinkButton
              href={routes.support}
              variant="outlined"
              className={classes.volunteerButton}>
              {t('campaigns:info-graphics.become-volunteer-button')}
            </LinkButton>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
