import React from 'react'
import { useTranslation } from 'react-i18next'
import { createStyles, Grid, Hidden, makeStyles, Theme, Typography } from '@material-ui/core'

import FlowGraphic from '../graphics/FlowGraphic'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      fontSize: theme.spacing(5),
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
    content: {
      fontSize: theme.spacing(2.2),
      marginBottom: theme.spacing(5),
    },
    graphic: {
      height: theme.spacing(27),
      width: theme.spacing(116),
    },
  }),
)

export default function AboutPlatform() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid
      container
      direction="column"
      component="section"
      alignContent="center"
      className={classes.container}>
      <Typography variant="h4" component="h2" className={classes.heading}>
        {t('about-project:aboutPlatformTitle')}
      </Typography>
      <Grid item>
        <Typography variant="h5" className={classes.content}>
          {t('about-project:aboutPlatformDescription')}
        </Typography>
      </Grid>
      <Hidden smDown>
        <Grid item>
          <FlowGraphic className={classes.graphic} />
        </Grid>
      </Hidden>
    </Grid>
  )
}
