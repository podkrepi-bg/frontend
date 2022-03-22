import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import EditPage from 'components/donations/EditPage'
import { keycloakInstance } from 'middleware/auth/keycloak'
import { prefetchDonationById } from 'common/hooks/donation'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)
  const { id } = params.query

  await prefetchDonationById(client, String(id))

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
