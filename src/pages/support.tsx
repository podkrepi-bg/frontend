import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import SupportFormPage from 'components/client/support-form/SupportPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', [
      'common',
      'support',
      'about',
      'about-project',
      'validation',
    ])),
  },
})

export default SupportFormPage
