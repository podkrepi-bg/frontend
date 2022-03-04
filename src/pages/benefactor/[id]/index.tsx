import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { keycloakInstance } from 'middleware/auth/keycloak'
import { authQueryFnFactory } from 'service/restRequests'
import BenefactorEditPage from 'components/benefactor/BenefactorEditPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const keycloak = keycloakInstance(params)
  const client = new QueryClient()
  await client.prefetchQuery(
    `${endpoints.benefactor.getBenefactor}/${params.query.id}`,
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

export default BenefactorEditPage
