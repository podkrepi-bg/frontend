import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Grid2 } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import Layout from 'components/client/layout/Layout'
import NotFoundIllustration from '../assets/NotFoundIllustration'

import { BackButton, ErrorMessage, Root } from './NotFoundPage.styled'

export default function NotFoundPage() {
  const { t } = useTranslation('common')
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  return (
    <Layout>
      <Root>
        <Grid2
          container
          size={{
            xs: 12,
            sm: 7,
            lg: 5,
          }}>
          <NotFoundIllustration />
        </Grid2>
        <ErrorMessage variant="body2">{t('errors.404Message')}</ErrorMessage>
        <BackButton
          size="large"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          onClick={handleBackClick}>
          {t('errors.backButtonLabel')}
        </BackButton>
      </Root>
    </Layout>
  )
}
