import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@material-ui/core'

import Layout from 'components/layout/Layout'

import Timeline from './sections/Timeline'
import TechStack from './sections/TechStack'
import WhatIsDone from './sections/WhatIsDone'
import AboutPlatform from './sections/AboutPlatform'

export default function AboutProject() {
  const { t } = useTranslation()

  return (
    <Layout title={t('about-project:aboutPlatformTitle')}>
      <Container maxWidth="lg">
        <AboutPlatform />
        <WhatIsDone />
        <TechStack />
        <Timeline />
      </Container>
    </Layout>
  )
}
