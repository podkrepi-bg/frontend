import Layout from 'components/layout/Layout'
import { useTranslation } from 'react-i18next'

import Jumbotron from './sections/Jumbotron'
import ActivitySection from './sections/ActivitySection'
import TeamSection from './sections/TeamSection'
import SupportUsSection from './sections/SupportUsSection'
import ProblemsToSolveSection from './sections/ProblemsToSolveSection'

export default function Index() {
  const { t } = useTranslation()

  return (
    <Layout title={t('index:title')}>
      <Jumbotron />
      <ActivitySection />
      <TeamSection />
      <SupportUsSection />
      <ProblemsToSolveSection />
    </Layout>
  )
}
