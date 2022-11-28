import { Session, unstable_getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient } from '@tanstack/react-query'

import { CampaignResponse } from 'gql/campaigns'
import { endpoints } from 'service/apiEndpoints'
import IndexPage from 'components/index/IndexPage'

import { authOptions } from './api/auth/[...nextauth]'
import { queryFnFactory } from 'service/restRequests'

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (ctx) => {
  const client = new QueryClient()
  await client.prefetchQuery<CampaignResponse[]>(
    [endpoints.campaign.listCampaigns.url],
    queryFnFactory<CampaignResponse[]>(),
  )

  //For getting session on server side the docs recommend using unstable_getServerSession as per
  //here: https://next-auth.js.org/getting-started/introduction#server-side
  //the docs say there is noting unstable, it just may change in next versions
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'index',
        'campaigns',
        'validation',
      ])),
      session,
    },
  }
}

export default IndexPage
