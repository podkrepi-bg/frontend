import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BankAccountsFormPage from 'components/bankaccounts/BankAccountsFormPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', [
      'common',
      'auth',
      'validation',
      'bankaccounts',
      'campaigns',
    ])),
  },
})

export default BankAccountsFormPage
