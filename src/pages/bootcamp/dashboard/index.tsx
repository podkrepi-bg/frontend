import { queryFn } from 'common/rest'
import BootcampStudentsGrid from 'components/bootcamp/BootcampStudentsGrid'
import DashboardLayout from 'components/bootcamp/DashboardLayout'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient, dehydrate } from 'react-query'

export default function DashboardPage() {
  return (
    <DashboardLayout title="Bootcamp students">
      <BootcampStudentsGrid />
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery('/bootcamp-student', queryFn)
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation'])),
      dehydratedState: dehydrate(client),
    },
  }
}
