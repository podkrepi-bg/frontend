import { Box } from '@mui/system'
import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'

import HowEveryThingBegin from './sections/HowEverythingBegin'
import PrinciplesThatUniteUs from './sections/PrinciplesThatUniteUs'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <Layout title={t('about:about.title')} metaDescription={t('about:about.description')}>
      <PrinciplesThatUniteUs />
      <HowEveryThingBegin />
      <Box textAlign="center" m={6}>
        <LinkButton color="primary" size="large" variant="contained" href={routes.support}>
          {t('nav.about.support-us')}
        </LinkButton>
      </Box>
    </Layout>
  )
}
