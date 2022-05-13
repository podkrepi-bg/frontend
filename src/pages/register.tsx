import { GetServerSideProps } from 'next'
import { getProviders, getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { baseUrl, routes } from 'common/routes'
import RegisterPage from 'components/auth/register/RegisterPage'

export type RegisterPageProps = {
  providers: Awaited<ReturnType<typeof getProviders>>
}

export const getServerSideProps: GetServerSideProps<RegisterPageProps> = async (ctx) => {
  const session = await getSession(ctx)
  if (session) {
    return {
      redirect: {
        destination: `${baseUrl}/${routes.profile.index}`,
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
