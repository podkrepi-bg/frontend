import OneTimeDonation from 'components/one-time-donation/OneTimeDonationPage'
import { GetServerSideProps } from 'next'
import { dehydrate } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient } from 'react-query'
import { queryFn } from 'service/restRequests'

// import { keycloakInstance } from 'middleware/auth/keycloak'

export const getServerSideProps: GetServerSideProps = async (params) => {
  // const keycloak = keycloakInstance(params)
  const { slug } = params.query
  const client = new QueryClient()
  await client.prefetchQuery(`/campaign/${slug}`, queryFn)
  return {
    props: {
      slug,
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default OneTimeDonation
