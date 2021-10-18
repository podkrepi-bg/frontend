import { GetServerSideProps } from 'next'
// import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import SupportersPage from 'components/admin/SupportersPage'
// import { prefetchSupportRequestList } from 'common/hooks/supportRequest'
// import { keycloakInstance } from 'common/util/keycloak'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const keycloak = keycloakInstance(ctx)
  // const client = new QueryClient()
  // await prefetchSupportRequestList(client, keycloak.token)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'auth', 'validation'])),
      // dehydratedState: dehydrate(client),
    },
  }
}

export default SupportersPage
