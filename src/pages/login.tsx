import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { routes } from 'common/routes'
import LoginPage from 'components/auth/login/LoginPage'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
    },
  }
}

export default LoginPage
