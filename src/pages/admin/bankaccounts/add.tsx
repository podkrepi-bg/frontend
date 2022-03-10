import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BankAccountsAddPage from 'components/bankaccounts/BankAccountsAddPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', [
      'common',
      'auth',
      'validation',
      'admin',
      'bankaccounts',
    ])),
  },
})

export default BankAccountsAddPage
