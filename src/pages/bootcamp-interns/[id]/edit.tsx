import { queryFn } from 'common/rest'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BootcampInternEditPage from 'components/bootcamp-interns/editPage/EditBootcampInternPage'

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { id } = query
  const client = new QueryClient()

  await client.prefetchQuery(`/bootcamp-intern/${id}`, queryFn)

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

export default BootcampInternEditPage
