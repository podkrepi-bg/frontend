import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import MainPage from 'components/campaign-document/MainPage'
import { keycloakInstance } from 'middleware/auth/keycloak'
import { prefetchCampaignDocument } from 'service/campaignDocument'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)

  await prefetchCampaignDocument(client, keycloak?.token)

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

export default MainPage
