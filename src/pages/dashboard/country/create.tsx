import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CountryCreatePage from 'components/dashboard/country/CountryCreatePage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'dashboard',
        'validation',
      ])),
    },
  }
}

export default CountryCreatePage
