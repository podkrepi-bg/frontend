import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { authQueryFnFactory } from 'service/restRequests'
import { keycloakInstance } from 'middleware/auth/keycloak'
import BenefactorPage from 'components/benefactor/BenefactorPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)
  // await client.prefetchQuery(endpoints.benefactor.benefactorList.url, queryFn)
  await client.prefetchQuery(
    endpoints.benefactor.benefactorList.url,
    authQueryFnFactory(keycloak.token),
  )

  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
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
