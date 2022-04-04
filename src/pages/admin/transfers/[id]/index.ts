import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { keycloakInstance } from 'middleware/auth/keycloak'

import { prefetchTransfer } from 'common/hooks/transfers'

import EditPage from 'components/transfers/EditPage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const keycloak = keycloakInstance(ctx)
  const client = new QueryClient()
  const { id } = ctx.query

  await prefetchTransfer(client, String(id), keycloak.token)
  return {
    props: {
      id,
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

export default EditPage
