import { GetStaticProps } from 'next'
import AboutPage from 'components/about/AboutPage'
import { getTranslations } from 'common/useNextLocale'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await getTranslations(locale, ['common', 'about']),
  },
})

export default AboutPage
