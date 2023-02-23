import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import { Grid, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { routes } from 'common/routes'
import Layout from 'components/client/layout/Layout'
import LinkButton from 'components/common/LinkButton'

import NotFoundIllustration from './assets/NotFoundIllustration'

const PREFIX = 'NotFoundPage'

const classes = {
  root: `${PREFIX}-root`,
}

const StyledLayout = styled(Layout)(() => ({
  [`& .${classes.root}`]: {
    flexGrow: 1,
    height: '100vh',
    margin: 0,
  },
}))

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <StyledLayout maxWidth="sm" disableOffset disableGutters>
      <Grid container className={classes.root}>
        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
          <Grid container item xs={8} sm={6} lg={4}>
            <NotFoundIllustration />
          </Grid>
          <Grid item>
            <Typography variant="body2">{t('common:errors.404Message')}</Typography>
          </Grid>
          <Grid container item alignItems="center" justifyContent="center">
            <LinkButton
              size="large"
              startIcon={<ArrowBackIcon />}
              color="inherit"
              variant="outlined"
              href={routes.index}>
              {t('common:errors.backButtonLabel')}
            </LinkButton>
          </Grid>
        </Grid>
      </Grid>
    </StyledLayout>
  )
}
