import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'common/rest'
import TikviPage from 'components/admin/TikviPage'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { id } = query
  const client = new QueryClient()
  await client.prefetchQuery(`/tikva/${id}`, queryFn)
  return {
    props: {
      id,
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default TikviPage
