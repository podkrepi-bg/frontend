import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ViewCampaignPage from 'components/client/campaigns/ViewCampaignPage'
import { endpoints } from 'service/apiEndpoints'
import { CampaignResponse } from 'gql/campaigns'
import { queryFnFactory } from 'service/restRequests'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query
  const client = new QueryClient()
  await client.prefetchQuery<CampaignResponse>(
    [endpoints.campaign.viewCampaign(slug as string).url],
    queryFnFactory<CampaignResponse>(),
  )

  return {
    props: {
      slug,
      ...(await serverSideTranslations(context.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
        'irregularity',
        'expenses',
        'news',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default ViewCampaignPage
