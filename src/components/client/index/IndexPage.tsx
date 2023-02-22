import { useTranslation } from 'next-i18next'
import Layout from 'components/client/layout/Layout'
import Jumbotron from './sections/Jumbotron/Jumbotron'
import CampaignsSection from './sections/CampaignsSection/CampaignsSection'
import HowWeWorkSection from './sections/HowWeWorkSection/HowWeWorkSection'
import TeamMembersSection from './sections/TeamMembersSection/TeamMembersSection'
import JoinPodkrepiBgSection from './sections/JoinPodkrepiBgSection/JoinPodkrepiBgSection'
import FaqSection from './sections/FaqSection/FaqSection'

export default function IndexPage() {
  const { t } = useTranslation()

  return (
    <Layout
      maxWidth={false}
      disableOffset
      disableGutters
      title={t('index:title2')}
      metaDescription={t('index:metaDescription')}>
      <Jumbotron />
      <CampaignsSection />
      <HowWeWorkSection />
      <TeamMembersSection />
      <JoinPodkrepiBgSection />
      <FaqSection />
    </Layout>
  )
}
