import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CampaignTypesPage from 'components/campaign-types/CampaignTypesPage'
import { prefetchCampaignTypesList } from 'service/campaignTypes'
import { keycloakInstance } from 'middleware/auth/keycloak'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)

  await prefetchCampaignTypesList(client, keycloak?.token)

  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'campaign-types',
        'validation',
        'admin',
        'documents',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default CampaignTypesPage
