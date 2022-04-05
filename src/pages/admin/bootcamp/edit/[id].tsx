import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { keycloakInstance } from 'middleware/auth/keycloak'
import BootcampEditPage from 'components/bootcamp/BootcampEditPage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const keycloak = keycloakInstance(ctx)
  const client = new QueryClient()
  await client.prefetchQuery(
    endpoints.bootcamp.editTask(`${ctx.query.id}`).url,
    authQueryFnFactory(keycloak.token),
  )
  return {
    props: {
      // values,
      // id,
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

export default BootcampEditPage
