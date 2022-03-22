import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BootcampNeliCreatePage from 'components/bootcampNeli/BootcampNeliCreatePage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', [
      'common',
      'auth',
      'validation',
      'bootcampNeli',
    ])),
  },
})

export default BootcampNeliCreatePage
