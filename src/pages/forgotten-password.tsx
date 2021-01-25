import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'common/useNextLocale'
import Page from 'components/forgottenPassword/ForgottenPasswordPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common']),
  },
})

export default Page
