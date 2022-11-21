import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient, QueryFunction } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CampaignsPage from 'components/campaigns/CampaignsPage'
import { prefetchCampaignTypesList } from 'service/campaignTypes'
import { apiClient } from 'service/apiClient'
import { CampaignResponse } from 'gql/campaigns'
import { shuffleArray } from 'common/util/shuffle'

// NOTE: shuffling the campaigns so that each gets its fair chance to be on top row
const shuffleQueryFn: QueryFunction<CampaignResponse[]> = async ({ queryKey }) => {
  const response = await apiClient.get(queryKey.join('/'))
  return shuffleArray<CampaignResponse>(response.data)
}

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  await client.prefetchQuery('/campaign/list', shuffleQueryFn)
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
