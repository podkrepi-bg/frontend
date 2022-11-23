import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import IrregularityPage from 'components/campaigns/IrregularityPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  const client = new QueryClient()
  await client.prefetchQuery([endpoints.campaign.viewCampaign(slug as string)])
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
