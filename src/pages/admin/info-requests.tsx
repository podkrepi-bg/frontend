import { GetServerSideProps } from 'next'
// import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import InfoRequestPage from 'components/admin/InfoRequestPage'
// import { prefetchInfoRequestList } from 'common/hooks/infoRequest'
// import { keycloakInstance } from 'common/util/keycloak'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const keycloak = keycloakInstance(ctx)
  // const client = new QueryClient()
  // await prefetchInfoRequestList(client, keycloak.token)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'auth', 'validation'])),
      // dehydratedState: dehydrate(client),
    },
  }
}

export default InfoRequestPage
