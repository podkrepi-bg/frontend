import BootcampComponent from 'components/bootcamp/BootcampPageComponent'
import { keycloakInstance } from 'middleware/auth/keycloak'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)
  // await client.prefetchQuery(endpoints.benefactor.benefactorList.url, queryFn)
  await client.prefetchQuery(endpoints.bootcamp.getAll.url, authQueryFnFactory(keycloak.token))

  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'bootcamp',
        'admin',
        'documents',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

const BootcampPage = () => {
  return <BootcampComponent />
}

export default BootcampPage
