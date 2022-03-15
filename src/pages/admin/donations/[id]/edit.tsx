import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import EditPage from 'components/donations/EditPage'
import { prefetchDonationById } from 'common/hooks/donations'
import { keycloakInstance } from 'middleware/auth/keycloak'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)
  const { id } = params.query

  await prefetchDonationById(client, String(id), keycloak.token)

  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'donations',
        'validation',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default EditPage
