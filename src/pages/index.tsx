import { Session, getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient } from '@tanstack/react-query'

import IndexPage from 'components/client/index/IndexPage'
import { campaignsOrderQueryFunction } from 'common/hooks/campaigns'
import { CampaignResponse } from 'gql/campaigns'
import { endpoints } from 'service/apiEndpoints'

import { authOptions } from './api/auth/[...nextauth]'

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (ctx) => {
  const client = new QueryClient()
  await client.prefetchQuery<CampaignResponse[]>(
    [endpoints.campaign.listCampaigns.url],
    campaignsOrderQueryFunction,
  )

  //For getting session on server side the docs recommend using getServerSession as per
  //here: https://next-auth.js.org/configuration/nextjs#getserversession
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'index', 'campaigns'])),
      session,
    },
  }
}

export default IndexPage
