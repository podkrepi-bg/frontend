import Layout from 'components/layout/Layout'
import { useTranslation } from 'react-i18next'

import Jumbotron from './Jumbotron'
import ActivitySection from './ActivitySection'
import TeamSection from './TeamSection'
import SupportUsSection from './SupportUsSection'

export default function Index() {
  const { t } = useTranslation()

  return (
    <Layout title={t('index:title')}>
      <Jumbotron />
      <ActivitySection />
      <TeamSection />
      <SupportUsSection />
    </Layout>
  )
}
