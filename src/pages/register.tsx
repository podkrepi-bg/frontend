import { GetStaticProps } from 'next'
import RegisterPage from 'components/register/RegisterPage'
import { serverSideTranslations } from 'common/useNextLocale'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common']),
  },
})

export default RegisterPage
