import React from 'react'

import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const PREFIX = 'CampaignInfoGraphics'

const classes = {
  title: `${PREFIX}-title`,
  infoBlock: `${PREFIX}-infoBlock`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.title}`]: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(16),
  },

  [`& .${classes.infoBlock}`]: {
    display: 'inline-flex',
    alignItems: 'center',
  },
}))

export default function CampaignInfoGraphics() {
  const { t } = useTranslation()

  const donationIconSource = '/img/donation-icon.png'
  const transparencyIconSource = '/img/transparency-icon.png'
  const approvalIconSource = '/img/approval-icon.png'

  return (
    <StyledGrid container>
      <Grid item xs={12} md={6} className={classes.infoBlock}>
        <Image alt="Donation icon" src={donationIconSource} width={189} height={127} />
        <Grid>
          <Typography className={classes.title}>
            {t('campaigns:info-graphics.donation-title')}
          </Typography>
          <Typography> {t('campaigns:info-graphics.donation-text')}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} className={classes.infoBlock}>
        <Image alt="Transparency icon" src={transparencyIconSource} width={202} height={100} />
        <Grid>
          <Typography className={classes.title}>
            {t('campaigns:info-graphics.transparency-title')}
          </Typography>
          <Typography> {t('campaigns:info-graphics.transparency-text')}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} className={classes.infoBlock}>
        <Image alt="Approval icon" src={approvalIconSource} width={202} height={102} />
        <Grid>
          <Typography className={classes.title}>
            {t('campaigns:info-graphics.approval-title')}
          </Typography>
          <Typography>{t('campaigns:info-graphics.approval-title')}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} className={classes.infoBlock}>
        <Grid>
          <Typography className={classes.title}>
            {t('campaigns:info-graphics.become-volunteer-title')}
          </Typography>
          <Typography>{t('campaigns:info-graphics.become-volunteer-button')}</Typography>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
