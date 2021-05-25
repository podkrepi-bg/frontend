import React from 'react'
import { useTranslation } from 'next-i18next'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'

import DiscordImage from '../DiscordImage'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.primary.dark,
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(7),
    },
  }),
)
export default function HowEverythingBegin() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid container alignItems="center" spacing={4}>
      <Grid item>
        <Typography variant="h6" component="p" align="center">
          {t('about:about.description')}
        </Typography>
      </Grid>
      <Grid item></Grid>
      <Grid item>
        <Typography component="p">{t('about:howEverythingBegin.volunteers')}</Typography>
        <Typography component="p">{t('about:howEverythingBegin.vision')}</Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography variant="h4" component="h2" align="center" className={classes.title}>
          {t('about:howEverythingBegin.title')}
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography component="p">{t('about:howEverythingBegin.mission')}</Typography>
      </Grid>
      <Grid xs={12} item>
        <DiscordImage />
      </Grid>
    </Grid>
  )
}
