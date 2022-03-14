import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import EditPage from 'components/campaign-types/EditPage'
import { prefetchCampaignTypeById } from 'service/restRequests/campaignTypes'
import { keycloakInstance } from 'middleware/auth/keycloak'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)
  const { id } = params.query

  await prefetchCampaignTypeById(client, String(id), keycloak.token)

  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'campaign-types',
        'validation',
        'documents',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default EditPage
