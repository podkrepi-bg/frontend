import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'
import ManagementBoardMembers from './ManagementBoardMembers'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <Layout title={t('about:about.title')}>
      <ManagementBoardMembers />
      {/* <PrinciplesThatUniteUs /> */}
    </Layout>
  )
}
