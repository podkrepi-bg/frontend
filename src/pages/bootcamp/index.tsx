import BootcampPage from 'components/bootcamp/BootcampPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { queryFn } from 'service/restRequests'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery('/bootcamp', queryFn)
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'bootcamp',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default BootcampPage
