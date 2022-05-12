import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LoginPage from 'components/auth/login/LoginPage'
import { getProviders } from 'next-auth/react'

export type LoginPageProps = {
  providers: Awaited<ReturnType<typeof getProviders>>
}

export const getServerSideProps: GetServerSideProps<LoginPageProps> = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'auth', 'validation'])),
      providers: await getProviders(),
    },
  }
}

export default LoginPage
