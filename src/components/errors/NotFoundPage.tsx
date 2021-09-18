import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import LinkButton from 'components/common/LinkButton'
import Layout from 'components/layout/Layout'
import { routes } from 'common/routes'

import NotFoundIllustration from './assets/NotFoundIllustration'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100vh',
      margin: 0,
      backgroundColor: theme.palette.secondary.light,
    },
  }),
)

export default function NotFoundPage() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Layout maxWidth={false} disableOffset disableGutters>
      <Grid container className={classes.root}>
        <Grid container direction="column" alignItems="center" justify="center" spacing={4}>
          <Grid container item xs={8} sm={6} lg={4}>
            <NotFoundIllustration />
          </Grid>
          <Grid item>
            <Typography variant="body2">{t('errors:404Message')}</Typography>
          </Grid>
          <Grid container item alignItems="center" justify="center">
            <LinkButton
              size="large"
              startIcon={<ArrowBackIcon />}
              color="default"
              variant="outlined"
              href={routes.index}>
              {t('errors:backButtonLabel')}
            </LinkButton>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}
