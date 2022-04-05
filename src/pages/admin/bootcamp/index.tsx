import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { endpoints } from 'service/apiEndpoints'

import { authQueryFnFactory } from 'service/restRequests'
import { keycloakInstance } from 'middleware/auth/keycloak'
import BootcampPage from '../../../components/bootcamp/BootCampPage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const keycloak = keycloakInstance(ctx)
  const client = new QueryClient()
  await client.prefetchQuery(endpoints.bootcamp.tasksList.url, authQueryFnFactory(keycloak.token))
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'admin',
        'bootcamp',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default BootcampPage
