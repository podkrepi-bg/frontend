import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'

import HowEveryThingBegin from './sections/HowEverythingBegin'
import PrinciplesThatUniteUs from './sections/PrinciplesThatUniteUs'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <Layout title={t('about:about.title')}>
      <HowEveryThingBegin />
      <PrinciplesThatUniteUs />
    </Layout>
  )
}
