import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ExpensesCreatePage from 'components/expenses/ExpensesCreatePage'

export const getServerSideProps: GetServerSideProps = async (params) => {
  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'admin',
        'expenses',
      ])),
    },
  }
}

export default ExpensesCreatePage
