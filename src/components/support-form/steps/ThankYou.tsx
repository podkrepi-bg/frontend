import React from 'react'
import { useTranslation } from 'next-i18next'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
)

export default function ThankYou() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container spacing={6} justify="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center"></Typography>
      </Grid>
      <Typography className={classes.instructions}>
        {t('common:support-form.steps.thank-you.content')}
      </Typography>
    </Grid>
  )
}
