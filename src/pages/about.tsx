import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AboutPage from 'components/about/AboutPage'

export const getServerSideProps: GetServerSideProps = async ({ locale = 'bg' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'about'])),
  },
})

export default AboutPage
