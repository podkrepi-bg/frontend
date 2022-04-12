import { useRef } from 'react'
import { Container } from '@mui/material'
import { useTranslation } from 'next-i18next'

import Layout from 'components/layout/Layout'

import Jumbotron from './sections/Jumbotron'
import CampaignsSection from './sections/CampaignsSection'
import HowWeWorkSection from './sections/HowWeWorkSection'
import ReadyToStartCampaignSection from './sections/ReadyToStartCampaignSection'
import WhatUnitesUsSection from './sections/WhatUnitesUsSection'
import { RefObject } from 'react-transition-group/node_modules/@types/react'
import WantToHelpPodkrepiBgSection from './sections/WantToHelpPodkrepiBg'
import FaqSection from './sections/FaqSection'

export default function IndexPage() {
  const scrollElement = useRef<HTMLAnchorElement>(null)
  const { t } = useTranslation()

  return (
    <Layout
      maxWidth={false}
      disableOffset
      disableGutters
      title={t('index:jumbotron.heading')}
      metaDescription={t('index:activity-section.content')}>
      <Jumbotron />
      <Container ref={scrollElement as RefObject<HTMLDivElement>} maxWidth="md">
        <CampaignsSection />
        <HowWeWorkSection />
        <ReadyToStartCampaignSection />
        <WhatUnitesUsSection />
        <WantToHelpPodkrepiBgSection />
        <FaqSection />
        <ReadyToStartCampaignSection />
      </Container>
    </Layout>
  )
}
