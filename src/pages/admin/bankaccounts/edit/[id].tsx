import { dehydrate, QueryClient } from 'react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { keycloakInstance } from 'middleware/auth/keycloak'
import BankAccountsEditPage from 'components/bankaccounts/BankAccountsEditPage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const keycloak = keycloakInstance(ctx)
  const client = new QueryClient()
  await client.prefetchQuery(
    endpoints.bankAccounts.editBankAccount(`${ctx.query.id}`).url,
    authQueryFnFactory(keycloak.token),
  )
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
        'bankaccounts',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default BankAccountsEditPage
