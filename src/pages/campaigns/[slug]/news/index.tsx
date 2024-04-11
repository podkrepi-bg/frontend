import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import CampaignNewsPage from 'components/client/campaign-news/CampaignNewsPage'
import { endpoints } from 'service/apiEndpoints'
import { CampaignNewsWithPaginationResponse } from 'gql/campaign-news'
import { queryFnFactory } from 'service/restRequests'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const page = parseInt(query.page as string) > 0 ? parseInt(query.page as string) : 1
  const slug = (query.slug as string) ?? null
  const client = new QueryClient()
  await client.prefetchQuery<CampaignNewsWithPaginationResponse>(
    [endpoints.campaign.listNewsForCampaign(page, slug).url],
    queryFnFactory<CampaignNewsWithPaginationResponse>(),
  )
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'breadcrumb', 'news'])),
      page: page,
      slug: slug,
      dehydratedState: dehydrate(client),
    },
  }
}

export default CampaignNewsPage
