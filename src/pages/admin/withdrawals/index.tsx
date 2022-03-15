import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { keycloakInstance } from 'middleware/auth/keycloak'
import { prefetchWithdrawalsList } from 'common/hooks/withdrawals'
import WithdrawalsPage from 'components/withdrawals/WithdrawalPage'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)

  await prefetchWithdrawalsList(client, keycloak?.token)

  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'withdrawals',
        'validation',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default WithdrawalsPage
