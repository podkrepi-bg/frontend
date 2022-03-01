import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'service/restRequests'
import BenefactorPage from 'components/benefactor/BenefactorPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery(endpoints.benefactor.benefactorList.url, queryFn)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'benefactor',
        'validation',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default BenefactorPage
