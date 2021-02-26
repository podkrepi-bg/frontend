import { Container } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import Layout from 'components/layout/Layout'
import Jumbotron from './sections/Jumbotron'
import ActivitySection from './sections/ActivitySection'
import TeamSection from './sections/TeamSection'
import TeamChartSection from './sections/TeamChartSection'
import SupportUsSection from './sections/SupportUsSection'
import ProblemsToSolveSection from './sections/ProblemsToSolveSection'

export default function Index() {
  const { t } = useTranslation()

  return (
    <Layout maxWidth={false} title={t('index:title')}>
      <Jumbotron />
      <Container maxWidth="md">
        <ActivitySection />
        <TeamSection />
        <TeamChartSection />
        <SupportUsSection />
        <ProblemsToSolveSection />
      </Container>
    </Layout>
  )
}
