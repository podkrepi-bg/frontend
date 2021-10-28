import { useTranslation } from 'next-i18next'
import makeStyles from '@mui/styles/makeStyles'
import { Grid, Typography } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { routes } from 'common/routes'
import Layout from 'components/layout/Layout'
import LinkButton from 'components/common/LinkButton'

import NotFoundIllustration from './assets/NotFoundIllustration'

const useStyles = makeStyles(() =>
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
  const classes = useStyles()

  return (
    <Layout maxWidth="sm" disableOffset disableGutters>
      <Grid container className={classes.root}>
        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
          <Grid container item xs={8} sm={6} lg={4}>
            <NotFoundIllustration />
          </Grid>
          <Grid item>
            <Typography variant="body2">{t('errors:404Message')}</Typography>
          </Grid>
          <Grid container item alignItems="center" justifyContent="center">
            <LinkButton
              size="large"
              startIcon={<ArrowBackIcon />}
              color="inherit"
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
