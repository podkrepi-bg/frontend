import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'
import EditPage from 'components/campaign-document/EditPage'
import { keycloakInstance } from 'middleware/auth/keycloak'
import { prefetchCampaignDocumentById } from 'service/campaignDocument'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const keycloak = keycloakInstance(params)
  const { id } = params.query
  const client = new QueryClient()
  await prefetchCampaignDocumentById(client, String(id), keycloak.token)
  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'admin',
        'campaign-document',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default EditPage
