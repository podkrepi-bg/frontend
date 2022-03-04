import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { keycloakInstance } from 'middleware/auth/keycloak'
import { prefetchVaultsList } from 'common/hooks/vaults'
import VaultsPage from 'components/vaults/VaultsPage'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)

  await prefetchVaultsList(client, keycloak?.token)

  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'vaults',
        'validation',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default VaultsPage
