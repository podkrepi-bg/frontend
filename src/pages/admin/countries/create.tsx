import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CountryCreatePage from 'components/countries/CountryCreatePage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'countries',
      ])),
    },
  }
}

export default CountryCreatePage
