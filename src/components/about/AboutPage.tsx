import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'
import ManagementBoardSection from './sections/ManagementBoardSection'
import ActiveMembers from './sections/ActiveMembersSection'
import SupervisoryBoardSection from './sections/SupervisoryBoardSection'
import AssociationMEmbersSection from './sections/AssociationMembersSection'
import AboutTheTeamSection from './sections/AboutTheTeamSection'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <Layout title={t('about:about.title')} maxWidth="xl">
      <ManagementBoardSection />
      <SupervisoryBoardSection />
      <ActiveMembers />
      <AssociationMEmbersSection />
      <AboutTheTeamSection />
      {/* <PrinciplesThatUniteUs /> */}
    </Layout>
  )
}
