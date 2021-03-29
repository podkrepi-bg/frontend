import React from 'react'
import { useTranslation } from 'react-i18next'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { Timeline as TimelineMaterial } from '@material-ui/lab'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
import CodeIcon from '@material-ui/icons/Code'
import TelegramIcon from '@material-ui/icons/Telegram'
import UpdateIcon from '@material-ui/icons/Update'

import TimelineItem from './TimelineItem'

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
    content: {
      fontSize: theme.typography.pxToRem(17.6),
      maxWidth: theme.spacing(20),
    },
  }),
)

export default function Timeline() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Typography variant="h4" component="h2" className={classes.heading}>
        {t('about-project:timeline')}
      </Typography>
      <Grid item>
        <TimelineMaterial align="alternate">
          <TimelineItem Icon={PlayCircleFilledWhiteIcon}>
            <Typography variant="body2" component="span" className={classes.content}>
              {t('about-project:mvpLaunch')}
            </Typography>
          </TimelineItem>
          <TimelineItem Icon={UpdateIcon}>
            <Typography variant="body2" component="span" className={classes.content}>
              {t('about-project:betaLaunch')}
            </Typography>
          </TimelineItem>
          <TimelineItem Icon={TelegramIcon} lastItem={true}>
            <Typography variant="body2" component="span" className={classes.content}>
              {t('about-project:officialLaunch')}
            </Typography>
          </TimelineItem>
        </TimelineMaterial>
      </Grid>
    </Grid>
  )
}
