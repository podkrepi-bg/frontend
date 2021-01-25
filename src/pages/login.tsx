import { GetStaticProps } from 'next'
import LoginPage from 'components/login/LoginPage'
import { serverSideTranslations } from 'common/useNextLocale'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common', 'auth']),
  },
})

export default LoginPage
