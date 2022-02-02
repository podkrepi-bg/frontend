import { queryFn } from 'common/rest'
import BootcampStudentsGrid from 'components/bootcamp/BootcampStudentsGrid'
import DashboardLayout from 'components/bootcamp/DashboardLayout'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient, dehydrate } from 'react-query'

export default function DashboardPage() {
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t('common:nav.bootcamp.students')}>
      <BootcampStudentsGrid />
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery('/bootcamp-student', queryFn)
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation', 'bootcamp'])),
      dehydratedState: dehydrate(client),
    },
  }
}
