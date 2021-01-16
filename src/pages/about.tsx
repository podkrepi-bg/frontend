import { GetStaticProps } from 'next'
import AboutPage from 'components/about/AboutPage'
import { serverSideTranslations } from 'common/useNextLocale'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common', 'about']),
  },
})

export default AboutPage
