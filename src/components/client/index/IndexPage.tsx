import { useTranslation } from 'next-i18next'

import Layout from 'components/client/layout/Layout'
import ActiveCampaignsSection from './sections/ActiveCampaignsSection/ActiveCampaignsSection'
import CompletedCampaignsSection from './sections/CompletedCampaignsSection/CompletedCampaignsSection'
import HowWeWorkSection from './sections/HowWeWorkSection/HowWeWorkSection'
import TeamMembersSection from './sections/TeamMembersSection/TeamMembersSection'
import JoinPodkrepiBgSection from './sections/JoinPodkrepiBgSection/JoinPodkrepiBgSection'
import FaqSection from './sections/FaqSection/FaqSection'
import PlatformStatisticsSection from './sections/PlatformStatisticsSection/PlatformStatisticsSection'

export default function IndexPage() {
  const { t } = useTranslation('index')
  return (
    <Layout
      maxWidth={false}
      disableOffset
      disableGutters
      title={t('title')}
      metaDescription={t('metaDescription')}>
      <ActiveCampaignsSection />
      <CompletedCampaignsSection />
      <HowWeWorkSection />
      <PlatformStatisticsSection />
      <TeamMembersSection />
      <JoinPodkrepiBgSection />
      <FaqSection />
    </Layout>
  )
}
