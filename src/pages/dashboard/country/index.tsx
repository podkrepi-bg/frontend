import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'
import CountryMainPage from 'components/dashboard/country/CountryMainPage'

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

export default CountryMainPage
