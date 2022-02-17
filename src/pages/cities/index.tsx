import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'common/rest'
import CityPage from 'components/cities/CityPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery(`/city/list`, queryFn)
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'auth', 'validation', 'cities'])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default CityPage
