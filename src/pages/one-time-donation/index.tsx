import OneTimeDonation from 'components/one-time-donation/OneTimeDonationPage'
import { GetServerSideProps } from 'next'
// import { dehydrate } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// import { keycloakInstance } from 'middleware/auth/keycloak'

export const getServerSideProps: GetServerSideProps = async (params) => {
  // const keycloak = keycloakInstance(params)

  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
      ])),
      // dehydratedState: dehydrate(client),
    },
  }
}

export default OneTimeDonation
