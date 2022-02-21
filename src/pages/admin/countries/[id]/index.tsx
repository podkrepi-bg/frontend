import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { keycloakInstance } from 'middleware/auth/keycloak'
import { authQueryFnFactory } from 'service/restRequests'
import { endpoints } from 'service/apiEndpoints'

import CountryEditPage from 'components/countries/CountryEditPage'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const { id } = params.query
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)

  await client.prefetchQuery(
    endpoints.country.editCountry(`${id}`).url,
    authQueryFnFactory(keycloak.token),
  )

  return {
    props: {
      id,
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'validation',
        'countries',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default CountryEditPage
