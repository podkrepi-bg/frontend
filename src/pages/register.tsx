import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import RegisterPage from 'components/auth/register/RegisterPage'

export const getServerSideProps: GetServerSideProps = async ({ locale = 'bg' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'auth', 'validation'])),
  },
})

export default RegisterPage
