import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

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
