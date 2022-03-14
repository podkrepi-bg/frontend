import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Theme, Typography } from '@mui/material'

import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { useHeaderStyles } from '../helpers/header-styles'
import theme from 'common/theme'

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
  const headerClasses = useHeaderStyles(theme)

  return (
    <Grid container spacing={6} justifyContent="center">
      <Grid item xs={12}>
        <Typography
          variant="h4"
          align="center"
          className={classes.heading + ' ' + headerClasses.subtitleText}>
          {t('support:steps.thank-you.content')}
        </Typography>
      </Grid>
      <Typography align="center" className={classes.instructions}>
        {t('support:steps.thank-you.await-instructions')}
      </Typography>
    </Grid>
  )
}
