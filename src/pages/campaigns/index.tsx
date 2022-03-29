import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'service/restRequests'
import CampaignsPage from 'components/campaigns/CampaignsPage'
import { keycloakInstance } from 'middleware/auth/keycloak'
import { prefetchCampaignTypesList } from 'service/campaignTypes'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)
  await client.prefetchQuery('/campaign/list', queryFn)
  await prefetchCampaignTypesList(client, keycloak?.token)
  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default CampaignsPage
