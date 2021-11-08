import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LoginPage from 'components/auth/login/LoginPage'
import { setup } from 'common/csrf'

export type LoginPageProps = {
  providers: string[]
}

const _getServerSideProps: GetServerSideProps<LoginPageProps> = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'auth', 'validation'])),
      providers: [],
    },
  }
}

export const getServerSideProps = setup(_getServerSideProps)
export default LoginPage
