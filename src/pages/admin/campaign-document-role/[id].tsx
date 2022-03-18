import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'
import EditPage from 'components/campaign-document-role/EditPage'
import { keycloakInstance } from 'middleware/auth/keycloak'
import { prefetchCampaignDocumentRolById } from 'service/campaignDocumentRole'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const keycloak = keycloakInstance(params)
  const { id } = params.query
  const client = new QueryClient()
  await prefetchCampaignDocumentRolById(client, String(id), keycloak.token)
  return {
    props: {
      // values,
      // id,
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'admin',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default EditPage
