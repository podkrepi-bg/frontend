import AboutPage from 'components/about/AboutPage'
import { GetStaticProps } from 'next'
import { getTranslations } from '../i18n'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await getTranslations(locale, ['common', 'about']),
  },
})

export default AboutPage
