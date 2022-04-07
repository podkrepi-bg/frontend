import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { keycloakInstance } from 'middleware/auth/keycloak'
import RecurringDonationPage from 'components/recurring-donation/RecurringDonationPage'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)

  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'recurring-donation',
        'admin',
        'validation',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default RecurringDonationPage
