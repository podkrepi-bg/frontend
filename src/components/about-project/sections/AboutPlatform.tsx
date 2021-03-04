import React from 'react'
import { useTranslation } from 'react-i18next'
import { createStyles, Grid, Hidden, makeStyles, Theme, Typography } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import FlowGraphic from '../graphics/FlowGraphic'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
    graphic: {
      height: theme.spacing(27), //221
      width: theme.spacing(116), //932
    },
  }),
)

export default function AboutPlatform() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Typography variant="h5" component="h2" className={classes.heading}>
        {'Какво представлява платформата Podkrepi.BG'}
      </Typography>
      <Grid item>
        <Typography variant="body2">
          {
            'Това, което искаме да създадем, е open-source технологично решение, което значителнодрастично намалява шансовете за каквито и да било злоупотреби с даренитенабраните средства както от организаторите на кампании, така и от вътрешния екип на дарителската платформа.'
          }
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
