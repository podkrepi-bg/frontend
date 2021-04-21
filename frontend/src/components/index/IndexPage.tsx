import { useRef } from 'react'
import { Container } from '@material-ui/core'

import Layout from 'components/layout/Layout'

import Jumbotron from './sections/Jumbotron'
import ActivitySection from './sections/ActivitySection'
import TeamSection from './sections/TeamSection'
import TeamChartSection from './sections/TeamChartSection'
import SupportUsSection from './sections/SupportUsSection'

export default function IndexPage() {
  const scrollElement = useRef<HTMLAnchorElement>(null)
  return (
    <Layout maxWidth={false} disableOffset disableGutters>
      <Jumbotron scrollTo={scrollElement} />
      <Container innerRef={scrollElement} maxWidth="md">
        <ActivitySection />
        <TeamSection />
        <TeamChartSection />
      </Container>
      <SupportUsSection />
    </Layout>
  )
}
