import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'service/restRequests'
import BenefactorEditPage from 'components/benefactor/BenefactorEditPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { id } = query
  console.log(id)
  const client = new QueryClient()
  await client.prefetchQuery(`${endpoints.benefactor.getBenefactor.url}/${id}`, queryFn)

  return {
    props: {
      id,
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

export default BenefactorEditPage
