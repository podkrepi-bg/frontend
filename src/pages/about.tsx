import { GetServerSideProps } from 'next'
import AboutPage from 'components/about/AboutPage'
import { serverSideTranslations } from 'common/useNextLocale'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common', 'about']),
  },
})

export default AboutPage
