import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { keycloakInstance } from 'middleware/auth/keycloak'
import { prefetchTransferList } from 'common/hooks/transfers'

import TransferPage from 'components/transfers/TransferPage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const keycloak = keycloakInstance(ctx)
  const client = new QueryClient()
  await prefetchTransferList(client, keycloak?.token)

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'transfer',
        'admin',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default TransferPage
