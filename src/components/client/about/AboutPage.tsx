import { useTranslation } from 'next-i18next'

import Layout from 'components/client/layout/Layout'
import ManagementBoardSection from './sections/ManagementBoardSection/ManagementBoardSection'
import ActiveMembersSection from './sections/ActiveMembersSection/ActiveMembersSection'
import SupervisoryBoardSection from './sections/SupervisoryBoardSection/SupervisoryBoardSection'
import AssociationMembersSection from './sections/AssociationMembersSection/AssociationMembersSection'
import AboutTheTeamSection from './sections/AboutTheTeamSection/AboutTheTeamSection'

export default function AboutPage() {
  const { t } = useTranslation('about')

  return (
    <Layout title={t('about.title')} maxWidth="xl">
      <ManagementBoardSection />
      <AssociationMembersSection />
      <ActiveMembersSection />
      <SupervisoryBoardSection />
      <AboutTheTeamSection />
      {/* <PrinciplesThatUniteUs /> */}
    </Layout>
  )
}
