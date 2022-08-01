import { useTranslation } from 'next-i18next'
import Layout from 'components/layout/Layout'
import Jumbotron from './sections/Jumbotron'
import CampaignsSection from './sections/CampaignsSection'
import HowWeWorkSection from './sections/HowWeWorkSection'
import ReadyToStartCampaignSection from './sections/ReadyToStartCampaignSection'
import WhatUnitesUsSection from './sections/WhatUnitesUsSection'
import WantToHelpPodkrepiBgSection from './sections/WantToHelpPodkrepiBg'
import FaqSection from './sections/FaqSection'
import TeamMembersSection from './sections/TeamMembersSection'
import BetaPopUpDialog from './sections/BetaPopUpDialog'

export default function IndexPage() {
  const { t } = useTranslation()

  return (
    <Layout
      maxWidth={false}
      disableOffset
      disableGutters
      title={t('index:metaDescription')}
      metaDescription={t('index:metaDescription')}>
      <BetaPopUpDialog />
      <Jumbotron />
      <CampaignsSection />
      <HowWeWorkSection />
      {/* <ReadyToStartCampaignSection /> */}
      <TeamMembersSection />
      <WhatUnitesUsSection />
      <WantToHelpPodkrepiBgSection />
      <FaqSection />
      {/* <ReadyToStartCampaignSection /> */}
    </Layout>
  )
}
