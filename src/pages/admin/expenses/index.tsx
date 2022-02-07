import { queryFn } from 'common/rest'
import { GetServerSideProps } from 'next'
import { QueryClient, dehydrate } from 'react-query'
import { prefectExpensesList } from 'common/hooks/expenses'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ExpensePage from 'components/admin/expenses/ExpensesPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery('/expenses', queryFn)
  prefectExpensesList(client)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation'])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default ExpensePage
