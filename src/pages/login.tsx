import { GetStaticProps } from 'next'
import { providers } from 'next-auth/client'

import LoginPage from 'components/auth/login/LoginPage'
import { serverSideTranslations } from 'common/useNextLocale'

type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never

export type LoginPageProps = { providers: UnboxPromise<ReturnType<typeof providers>> }

export const getStaticProps: GetStaticProps<LoginPageProps> = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common', 'auth', 'validation']),
    providers: await providers(),
  },
})

export default LoginPage
