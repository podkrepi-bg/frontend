import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LoginPage from 'components/auth/login/LoginPage'

export type LoginPageProps = {
  providers: string[]
  csrfToken: string
}

export const getServerSideProps: GetServerSideProps<LoginPageProps> = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'auth', 'validation'])),
      csrfToken: '',
      providers: [],
    },
  }
}

export default LoginPage
