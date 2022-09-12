import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'
import AboutTheTeamSection from './sections/AboutTheTeamSection'
import ManagementBoardSection from './sections/ManagementBoardSection'
import SupervisoryBoardSection from './sections/SupervisoryBoardSection'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <Layout title={t('about:about.title')} maxWidth="xl">
      <ManagementBoardSection />
      <SupervisoryBoardSection />
      <AboutTheTeamSection />
      {/* <PrinciplesThatUniteUs /> */}
    </Layout>
  )
}
