import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'
import ManagementBoardSection from './sections/ManagementBoardSection'
import ActiveMembersSection from './sections/ActiveMembersSection'
import SupervisoryBoardSection from './sections/SupervisoryBoardSection'
import AssociationMembersSection from './sections/AssociationMembersSection'
import AboutTheTeamSection from './sections/AboutTheTeamSection'
import PrinciplesThatUniteUs from './sections/PrinciplesThatUniteUs'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <Layout title={t('about:about.title')} maxWidth="xl">
      <ManagementBoardSection />
      <SupervisoryBoardSection />
      <ActiveMembersSection />
      <AssociationMembersSection />
      <AboutTheTeamSection />
      {/* <PrinciplesThatUniteUs /> */}
    </Layout>
  )
}
