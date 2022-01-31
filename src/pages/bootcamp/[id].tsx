import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'common/rest'
import BootcampEditInternPage from 'components/bootcamp/BootcampEditInternPage'
import { endpoints } from 'common/api-endpoints'

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const id = { query }
  const client = new QueryClient()
  await client.prefetchQuery(`${endpoints.bootcamp.getIntern.url}/${id}`, queryFn)

  return {
    props: {
      id,
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

export default BootcampEditInternPage
