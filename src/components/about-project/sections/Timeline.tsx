import React from 'react'
import { useTranslation } from 'react-i18next'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'

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
  }),
)

export default function Timeline() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Typography variant="h5" component="h2" className={classes.heading}>
        {'Какво предстои'}
      </Typography>
      <Grid item>
        <Typography variant="body2">{'Timeline:'}</Typography>
      </Grid>
    </Grid>
  )
}
