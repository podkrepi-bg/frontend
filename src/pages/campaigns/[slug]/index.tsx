import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'service/restRequests'
import ViewCampaignPage from 'components/campaigns/ViewCampaignPage'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  const client = new QueryClient()
  await client.prefetchQuery(`/campaign/${slug}`, queryFn)
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

export default ViewCampaignPage
