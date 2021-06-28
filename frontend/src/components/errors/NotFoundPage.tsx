import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import NotFoundIllustration from './assets/NotFoundIllustration'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100vh',
    },
  }),
)

export default function NotFoundPage() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <NotFoundIllustration />
        </Grid>
        <Grid item>
          <Typography variant="body2">{t('errors:404Message')}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
