import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { keycloakInstance } from 'middleware/auth/keycloak'

import { prefetchBootCampNeli } from 'common/hooks/bookcampNeli'

import BootcampNeliEditPage from 'components/bootcampNeli/BootcampNeliEditPage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const keycloak = keycloakInstance(ctx)
  const client = new QueryClient()
  const { id } = ctx.query

  await prefetchBootCampNeli(client, String(id), keycloak.token)
  return {
    props: {
      id,
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'bootcampNeli',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default BootcampNeliEditPage
