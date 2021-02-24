import { GetServerSideProps } from 'next'
import RegisterPage from 'components/auth/register/RegisterPage'
import { serverSideTranslations } from 'common/useNextLocale'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common', 'auth', 'validation']),
  },
})

export default RegisterPage
