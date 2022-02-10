import BankAccountsPage from 'components/bankaccounts/BankAccountsPage'

import { dehydrate, QueryClient } from 'react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'common/rest'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery(`/bankaccount`, queryFn)
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', [
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
export default BankAccountsPage
