import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'
import ManagementBoardSection from './sections/ManagementBoardSection'
import ActiveMembers from './sections/ActiveMembers'
import SupervisoryBoardSection from './sections/SupervisoryBoardSection'
import AboutTheTeamSection from './sections/AboutTheTeamSection'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <Layout title={t('about:about.title')} maxWidth="xl">
      <ManagementBoardSection />
      <SupervisoryBoardSection />
      <ActiveMembers />
      <AboutTheTeamSection />
      {/* <PrinciplesThatUniteUs /> */}
    </Layout>
  )
}
