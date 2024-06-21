import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import OpenDataPage from '../../components/client/open-data/OpenDataPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', [
      'common',
      'open-data',
      'validation',
      'auth',
    ])),
  },
})

export default OpenDataPage
