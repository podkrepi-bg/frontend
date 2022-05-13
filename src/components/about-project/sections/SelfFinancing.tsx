import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'

import ActivityIcon from '../icons/ActivityIcon'
import ApplyingForProgramIcon from '../icons/ApplyingForProgramIcon'
import FeesIcon from '../icons/FeesIcon'
import DonationIcon from '../icons/DonationIcon'
import CommissionIcon from '../icons/CommissionIcon'

export default function SelfFinancing() {
  const { t } = useTranslation()

  return (
    <Grid container direction="column" component="section" sx={{ mb: 12, textAlign: 'center' }}>
      <Typography
        variant="h4"
        component="h2"
        sx={(theme) => ({
          mb: 5,
          color: theme.palette.primary.dark,
          fontSize: theme.typography.pxToRem(40),
        })}>
        {t('about-project:selfFinancingTitle')}
      </Typography>
      <Grid item container sx={{ mb: 5 }}>
        <Grid item xs={12} sm={3}>
          <ActivityIcon Icon={CommissionIcon} description={t('about-project:commission')} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ActivityIcon Icon={DonationIcon} description={t('about-project:donation')} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ActivityIcon Icon={FeesIcon} description={t('about-project:fees')} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ActivityIcon
            Icon={ApplyingForProgramIcon}
            description={t('about-project:applyingForProgram')}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
