import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { NewsAdminPage } from 'components/client/campaign-news/secured/NewsAdminPage'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { isAdmin } from 'common/util/roles'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.query
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
      slug,
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

export default NewsAdminPage
