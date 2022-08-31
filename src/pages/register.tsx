import { GetServerSideProps } from 'next'
import { getProviders } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { routes } from 'common/routes'
import RegisterPage from 'components/auth/register/RegisterPage'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

export type RegisterPageProps = {
  providers: Awaited<ReturnType<typeof getProviders>>
}

export const getServerSideProps: GetServerSideProps<RegisterPageProps> = async (ctx) => {
  //For getting session on server side the docs recommend using unstable_getServerSession as per
  //here: https://next-auth.js.org/getting-started/introduction#server-side
  //the docs say there is noting unstable, it just may change in next versions
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: routes.profile.index,
        permanent: false,
      },
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'auth', 'validation'])),
      providers: await getProviders(),
    },
  }
}

export default RegisterPage
