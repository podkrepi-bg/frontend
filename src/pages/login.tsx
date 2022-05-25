import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { routes } from 'common/routes'
import LoginPage from 'components/auth/login/LoginPage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
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
