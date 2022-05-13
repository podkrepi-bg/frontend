import { dehydrate } from 'react-query'
import { QueryClient } from 'react-query'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'service/restRequests'
import { securedProps } from 'middleware/auth/securedProps'
import OneTimeDonation from 'components/one-time-donation/OneTimeDonationPage'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
