import { GetServerSideProps } from 'next'

import ContactPage from 'components/contact/ContactPage'
import { serverSideTranslations } from 'common/useNextLocale'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, [
      'common',
      'auth',
      'validation',
      'contact',
    ]),
  },
})

export default ContactPage
