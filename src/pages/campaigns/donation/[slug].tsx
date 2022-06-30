import { dehydrate } from 'react-query'
import { QueryClient } from 'react-query'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'service/restRequests'
import OneTimeDonation from 'components/one-time-donation/OneTimeDonationPage'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query
  const client = new QueryClient()
  await client.prefetchQuery(`/campaign/${slug}`, queryFn)
  return {
    props: {
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

export default OneTimeDonation
