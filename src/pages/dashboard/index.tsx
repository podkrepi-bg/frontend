import { queryFn } from 'common/rest'
import DashboardLayout from 'components/layout/DashboardLayout'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

export default function DashboardPage() {
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t('companies:all')}>
      <div>this is dashboard</div>
    </DashboardLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery('/company/list', queryFn)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation', 'companies'])),
      dehydratedState: dehydrate(client),
    },
  }
}
