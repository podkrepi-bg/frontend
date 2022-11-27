import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import CampaignsPage from 'components/campaigns/CampaignsPage'
import { prefetchCampaignTypesList } from 'service/campaignTypes'
import { endpoints } from 'service/apiEndpoints'
import { queryFnFactory } from 'service/restRequests'
import { CampaignResponse } from 'gql/campaigns'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  await client.prefetchQuery<CampaignResponse[]>(
    [endpoints.campaign.listCampaigns.url],
    queryFnFactory<CampaignResponse[]>(),
  )
  await prefetchCampaignTypesList(client)
  return {
    props: {
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

export default CampaignsPage
