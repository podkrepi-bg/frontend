import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory, queryFnFactory } from 'service/restRequests'

import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { isAdmin } from 'common/util/roles'
import { CampaignNewsResponse } from 'gql/campaign-news'
import NewsEditPage from 'components/client/campaign-news/secured/NewsEditPage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug, articleId } = ctx.query

  const client = new QueryClient()
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const isCampaignOrganizer = await client.fetchQuery<boolean>(
    [endpoints.campaign.canEditCampaign(slug as string).url],
    authQueryFnFactory<boolean>(session.accessToken),
  )
  await client.prefetchQuery<CampaignNewsResponse>(
    [endpoints.campaignNews.viewNewsArticleById(articleId as string).url],
    queryFnFactory<CampaignNewsResponse>(),
  )
  const canEditCampaign = isCampaignOrganizer || isAdmin(session)
  if (!canEditCampaign) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      isAdmin: isAdmin(session),
      articleId,
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
        'irregularity',
        'news',
        'admin',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default NewsEditPage
