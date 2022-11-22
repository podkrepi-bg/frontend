import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFnFactory } from 'service/restRequests'
import IrregularityPage from 'components/campaigns/IrregularityPage'
import { endpoints } from 'service/apiEndpoints'
import { CampaignResponse } from 'gql/campaigns'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  const client = new QueryClient()
  await client.prefetchQuery(
    [endpoints.campaign.viewCampaign(slug as string)],
    queryFnFactory<CampaignResponse>(),
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
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default IrregularityPage
