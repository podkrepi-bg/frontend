import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'common/useNextLocale'
import Page from 'components/auth/forgottenPassword/ForgottenPasswordPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common', 'auth']),
  },
})

export default Page
