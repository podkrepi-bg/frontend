import { GetServerSideProps } from 'next'
import AboutProjectPage from 'components/about-project/AboutProjectPage'
import { serverSideTranslations } from 'common/useNextLocale'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common', 'about']),
  },
})

export default AboutProjectPage
