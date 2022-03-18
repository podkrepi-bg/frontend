import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import MainPage from 'components/campaign-document-role/MainPage'
import { keycloakInstance } from 'middleware/auth/keycloak'
import { prefetchCampaignDocumentRole } from 'service/campaignDocumentRole'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)

  await prefetchCampaignDocumentRole(client, keycloak?.token)

  return {
    props: {
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

export default MainPage
