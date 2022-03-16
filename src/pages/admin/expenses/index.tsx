import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { keycloakInstance } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import ExpensesPage from 'components/expenses/ExpensesPage'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  const keycloak = keycloakInstance(params)

  await client.prefetchQuery(
    endpoints.expenses.listExpenses.url,
    authQueryFnFactory(keycloak.token),
  )

  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'admin',
        'expenses',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default ExpensesPage
