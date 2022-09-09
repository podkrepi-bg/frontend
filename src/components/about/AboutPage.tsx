import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'
import AboutTheTeamSection from './sections/AboutTheTeamSection'
import ManagementBoardMembersSection from './sections/ManagementBoardMembersSection'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <Layout title={t('about:about.title')} maxWidth="xl">
      <ManagementBoardMembersSection />
      <AboutTheTeamSection />
      {/* <PrinciplesThatUniteUs /> */}
    </Layout>
  )
}
