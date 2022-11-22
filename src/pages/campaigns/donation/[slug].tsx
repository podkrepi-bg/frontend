import { dehydrate } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFnFactory } from 'service/restRequests'
import OneTimeDonation from 'components/one-time-donation/OneTimeDonationPage'
import { endpoints } from 'service/apiEndpoints'
import { CampaignResponse } from 'gql/campaigns'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query
  const client = new QueryClient()
  await client.prefetchQuery(
    [endpoints.campaign.viewCampaign(slug as string)],
    queryFnFactory<CampaignResponse>(),
  )
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
