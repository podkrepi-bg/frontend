import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { Button, Grid, Typography } from '@material-ui/core'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import NotFoundIllustration from './assets/NotFoundIllustration'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100vh',
      margin: 0,
    },
  }),
)

export default function NotFoundPage() {
  const { t } = useTranslation()
  const router = useRouter()

  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid container direction="column" alignItems="center" justify="center" spacing={4} xs={12}>
        <Grid container item xs={8} sm={6} lg={4}>
          <NotFoundIllustration />
        </Grid>
        <Grid item>
          <Typography variant="body2">{t('errors:404Message')}</Typography>
        </Grid>
        <Grid container item alignItems="center" justify="center">
          <Button
            size="large"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            onClick={() => router.replace('/')}>
            {t('errors:backButtonLabel')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
