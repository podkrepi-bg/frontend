import Layout from 'components/layout/Layout'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

import { queryFn } from 'common/rest'
import BootcampStudentsGrid from 'components/bootcamp/BootcampStudentsGrid'

export type BootcampStudent = {
  firstName: string
  lastName: string
  id?: string
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

export default function BootcampStudentsPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('nav.bootcamp.students')}>
      <BootcampStudentsGrid />
    </Layout>
  )
}
