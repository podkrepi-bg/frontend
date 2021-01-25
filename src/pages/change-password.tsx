import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'common/useNextLocale'
import Page from 'components/changePassword/ChangePasswordPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common']),
  },
})

export default Page
