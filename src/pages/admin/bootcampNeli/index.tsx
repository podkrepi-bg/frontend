import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { keycloakInstance } from 'middleware/auth/keycloak'

import { prefetchBootCampNeliList } from 'common/hooks/bookcampNeli'

import BootcampNeliPage from 'components/bootcampNeli/BootcampNeliPage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const keycloak = keycloakInstance(ctx)
  const client = new QueryClient()
  await prefetchBootCampNeliList(client, keycloak?.token)

  return {
    props: {
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

export default BootcampNeliPage
