import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'common/rest'
import BootcampsPage from 'components/bootcamps/BootcampsPage'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  const client = new QueryClient()
  await client.prefetchQuery(`/bootcamp/list-one/${slug}`, queryFn)
  return {
    props: {
      slug,
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

export default BootcampsPage
