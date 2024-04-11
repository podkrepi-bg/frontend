import { useTranslation } from 'next-i18next'
import { Grid } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { routes } from 'common/routes'
import Layout from 'components/client/layout/Layout'
import NotFoundIllustration from '../assets/NotFoundIllustration'

import { BackButton, ErrorMessage, Root } from './NotFoundPage.styled'

export default function NotFoundPage() {
  const { t } = useTranslation('common')

  return (
    <Layout>
      <Root>
        <Grid container item xs={12} sm={7} lg={5}>
          <NotFoundIllustration />
        </Grid>
        <ErrorMessage variant="body2">{t('errors.404Message')}</ErrorMessage>
        <BackButton
          size="large"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          href={routes.index}>
          {t('errors.backButtonLabel')}
        </BackButton>
      </Root>
    </Layout>
  )
}
