import AboutPage from 'components/about/AboutPage'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    i18nNamespaces: ['common', 'about'],
  },
})

export default AboutPage
