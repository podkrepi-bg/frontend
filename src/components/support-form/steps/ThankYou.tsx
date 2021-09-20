import React from 'react'
import { useTranslation } from 'next-i18next'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      marginTop: theme.spacing(10),
    },
    instructions: {
      marginTop: theme.spacing(5),
    },
  }),
)

export default function ThankYou() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container spacing={6} justify="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center" className={classes.heading}>
          {t('support:steps.thank-you.content')}
        </Typography>
      </Grid>
      <Typography align="center" className={classes.instructions}>
        {t('support:steps.thank-you.await-instructions')}
      </Typography>
    </Grid>
  )
}
