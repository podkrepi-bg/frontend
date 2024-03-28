import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { endpoints } from 'service/apiEndpoints'
import { queryFnFactory } from 'service/restRequests'
import { CampaignNewsResponse } from 'gql/campaign-news'
import dynamic from 'next/dynamic'

const SingleArticlePage = dynamic(
  () => import('components/client/campaign-news/SingleArticlePage'),
  { ssr: false },
)

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  const client = new QueryClient()
  await client.prefetchQuery<CampaignNewsResponse>(
    [endpoints.campaignNews.viewArticleBySlug(slug as string).url],
    queryFnFactory<CampaignNewsResponse>(),
  )
  return {
    props: {
      slug,
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
        'irregularity',
        'expenses',
        'news',
        'campaign-types',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default SingleArticlePage
