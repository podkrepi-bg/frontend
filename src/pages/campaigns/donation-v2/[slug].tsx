import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { endpoints } from 'service/apiEndpoints'
import { queryFnFactory } from 'service/restRequests'
import { CampaignResponse } from 'gql/campaigns'

import DonationFlowPage from 'components/donation-flow/DonationFlowPage'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query
  const client = new QueryClient()
  await client.prefetchQuery<CampaignResponse>(
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

export default DonationFlowPage
