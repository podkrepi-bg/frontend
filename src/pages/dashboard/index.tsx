import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'common/rest'
import { endpoints } from 'common/api-endpoints'
import DashboardPage from 'components/dashboard/DashboardPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery(endpoints.country.listCountries.url, queryFn)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'country', 'dashboard'])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default DashboardPage
