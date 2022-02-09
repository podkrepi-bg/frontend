import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'common/rest'
import BootcampPage from 'components/bootcamp/BootcampPage'
import { endpoints } from 'common/api-endpoints'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery(endpoints.bootcamp.bootcampList.url, queryFn)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'bootcamp',
        'validation',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default BootcampPage
