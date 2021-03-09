import { GetServerSideProps } from 'next'
import { getSession, providers } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { routes } from 'common/routes'
import LoginPage from 'components/auth/login/LoginPage'

type UnboxPromise<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never

export type LoginPageProps = { providers: UnboxPromise<ReturnType<typeof providers>> }

export const getServerSideProps: GetServerSideProps<LoginPageProps> = async (ctx) => {
  const session = await getSession(ctx)

  if (session) {
    ctx.res.statusCode = 302
    ctx.res.setHeader('Location', routes.index)
    ctx.res.end()
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'auth', 'validation'])),
      providers: await providers(),
    },
  }
}

export default LoginPage
