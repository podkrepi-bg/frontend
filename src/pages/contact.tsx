import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ContactPage from 'components/contact/ContactPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'auth', 'validation', 'contact'])),
  },
})

export default ContactPage
