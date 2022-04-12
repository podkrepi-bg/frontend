import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DonationsPage from 'components/donations/DonationsPage'
import { prefetchDonationsList } from 'common/hooks/donation'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()

  await prefetchDonationsList(client)

  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'admin',
        'donations',
        'validation',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default DonationsPage
