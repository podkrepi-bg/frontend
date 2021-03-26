import React from 'react'
import { useTranslation } from 'react-i18next'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: { fontSize: theme.spacing(5), color: '#284E84' },
    volunteers: {
      paddingTop: theme.spacing(3.375),
      fontSize: theme.spacing(2.5),
    },
    mission: { paddingTop: theme.spacing(33.125), fontSize: theme.spacing(2.5) },
    vision: {
      paddingBottom: theme.spacing(2.5),
      paddingTop: theme.spacing(2.5),
      fontSize: theme.spacing(2.5),
    },
    manifesto: { paddingBottom: theme.spacing(11), fontSize: theme.spacing(2.5) },
  }),
)
export default function HowEverythingBegin() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h2" component="p" className={classes.title}>
          {t('about:howEverythingBegin.title')}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5" component="p" className={classes.volunteers}>
          {t('about:howEverythingBegin.volunteers')}
        </Typography>
      </Grid>
      <Grid container item alignItems="center">
        <Grid xs={12} item>
          <Typography variant="h5" component="p" className={classes.mission}>
            {t('about:howEverythingBegin.mission')}
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <Typography variant="h5" component="p" className={classes.vision}>
            {t('about:howEverythingBegin.vision')}
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <Typography variant="h5" component="p" className={classes.manifesto}>
            {t('about:howEverythingBegin.manifesto')}
          </Typography>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <Typography variant="h2" component="p" align="center" className={classes.title}>
          {t('about:howEverythingBegin.title')}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5" component="p" className={classes.mission}>
          {t('about:howEverythingBegin.mission')}
        </Typography>
      </Grid>
    </Grid>
  )
}
