import OneTimeDonation from 'components/one-time-donation/OneTimeDonationPage'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { dehydrate } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient } from 'react-query'
import { queryFn } from 'service/restRequests'
import { securedProps } from 'middleware/auth/keycloak'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // const keycloak = keycloakInstance(params)
  const { slug } = ctx.query
  const response = await securedProps(ctx, `/campaigns/donation/${slug}`)
  const client = new QueryClient()
  await client.prefetchQuery(`/campaign/${slug}`, queryFn)
  if ('props' in response) {
    return {
      props: {
        ...response.props,
        slug,
        dehydratedState: dehydrate(client),
        ...(await serverSideTranslations(ctx.locale ?? 'bg', [
          'common',
          'auth',
          'validation',
          'campaigns',
          'one-time-donation',
        ])),
      },
    }
  }
  return response
}

export default OneTimeDonation
