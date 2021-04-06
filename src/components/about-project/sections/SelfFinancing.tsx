import React from 'react'
import { useTranslation } from 'next-i18next'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'

import ActivityIcon from '../icons/ActivityIcon'
import ApplyingForProgramIcon from '../icons/ApplyingForProgramIcon'
import FeesIcon from '../icons/FeesIcon'
import DonationIcon from '../icons/DonationIcon'
import CommissionIcon from '../icons/CommissionIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      fontSize: theme.typography.pxToRem(40),
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
    icons: {
      marginBottom: theme.spacing(5),
    },
  }),
)

export default function SelfFinancing() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Typography variant="h4" component="h2" className={classes.heading}>
        {t('about-project:selfFinancingTitle')}
      </Typography>
      <Grid item container className={classes.icons}>
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
