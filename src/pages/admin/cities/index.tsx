import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { endpoints } from 'service/apiEndpoints'
import CityPage from 'components/cities/CityPage'
import { authQueryFnFactory } from 'service/restRequests'
import { keycloakInstance } from 'middleware/auth/keycloak'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const keycloak = keycloakInstance(ctx)
  const client = new QueryClient()
  await client.prefetchQuery(endpoints.city.citiesList.url, authQueryFnFactory(keycloak.token))
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'admin',
        'cities',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default CityPage
