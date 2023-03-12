import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import SupportUsFormPage from 'components/client/support-us-form/SupportUsPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', [
      'common',
      'support_us',
      'one-time-donation',
    ])),
  },
})

export default SupportUsFormPage
