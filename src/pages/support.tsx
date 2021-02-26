import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import SupportFormPage from 'components/support-form/SupportPage'

export const getServerSideProps: GetServerSideProps = async ({ locale = 'bg' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'about', 'validation'])),
  },
})

export default SupportFormPage
