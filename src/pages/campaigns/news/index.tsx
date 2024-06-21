import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import CampaignNewsPage from 'components/client/campaign-news/CampaignNewsPage'
import { endpoints } from 'service/apiEndpoints'
import { CampaignNewsWithPaginationResponse } from 'gql/campaign-news'
import { queryFnFactory } from 'service/restRequests'
import { isString } from 'lodash'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const page = isString(query.page) && parseInt(query.page) > 0 ? parseInt(query.page) : 1
  const client = new QueryClient()
  await client.prefetchQuery<CampaignNewsWithPaginationResponse>(
    [endpoints.campaign.listAllNews(page).url],
    queryFnFactory<CampaignNewsWithPaginationResponse>(),
  )
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'breadcrumb',
        'news',
        'validation',
        'auth',
      ])),
      page: page,
      dehydratedState: dehydrate(client),
    },
  }
}

export default CampaignNewsPage
