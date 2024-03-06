import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import CampaignsPage from 'components/client/campaigns/CampaignsPage'
import { campaignsOrderQueryFunction } from 'common/hooks/campaigns'
import { prefetchCampaignTypesList } from 'service/campaignTypes'
import { endpoints } from 'service/apiEndpoints'
import { CampaignResponse } from 'gql/campaigns'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const result = await Promise.allSettled([
    await client.prefetchQuery<CampaignResponse[]>(
      [endpoints.campaign.listCampaigns.url],
      campaignsOrderQueryFunction,
    ),
    prefetchCampaignTypesList(client),
    await serverSideTranslations(params.locale ?? 'bg', [
      'common',
      'auth',
      'validation',
      'campaigns',
    ]),
  ])
  const ssrTranslations = result[2].status === 'fulfilled' ? result[2].value : null
  return {
    props: {
      ...ssrTranslations,
      dehydratedState: dehydrate(client),
    },
  }
}

export default CampaignsPage
