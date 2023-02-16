import { getServerSession, Session } from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { routes } from 'common/routes'
import { authQueryFnFactory } from 'service/restRequests'

export const securedProps: (
  ctx: GetServerSidePropsContext,
  returnUrl?: string,
) => Promise<GetServerSidePropsResult<{ session: Session }>> = async (ctx, returnUrl?: string) => {
  //For getting session on server side the docs recommend using getServerSession as per
  //here: https://next-auth.js.org/configuration/nextjs#getserversession
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  let url = returnUrl ?? ctx.req.url ?? ''
  if (url.startsWith('/_next') || url.startsWith('/_error')) url = '/'

  if (!session) {
    console.warn('no server side session, login required')
    return {
      redirect: {
        destination: `${routes.login}?callbackUrl=${encodeURIComponent(url)}`,
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export const securedPropsWithTranslation: (
  namespaces?: string[],
  returnUrl?: string,
) => GetServerSideProps<{ session: Session }> =
  (namespaces = ['common', 'auth', 'validation'], returnUrl) =>
  async (ctx) => {
    const response = await securedProps(ctx, returnUrl)
    if ('props' in response) {
      return {
        props: {
          ...response.props,
          ...(await serverSideTranslations(ctx.locale ?? 'bg', namespaces)),
        },
      }
    }
    return response
  }

export const securedAdminProps: (
  namespaces?: string[],
  resolveEndpoint?: (ctx: GetServerSidePropsContext) => string,
) => GetServerSideProps<{ session: Session }> = (namespaces, resolveEndpoint) => async (ctx) => {
  const result = securedPropsWithTranslation(namespaces)
  const response = await result(ctx)
  if ('props' in response) {
    const client = new QueryClient()
    const { session } = await response.props

    if (resolveEndpoint) {
      await client.prefetchQuery([resolveEndpoint(ctx)], authQueryFnFactory(session.accessToken))
    }
    return {
      props: {
        ...response.props,
        dehydratedState: dehydrate(client),
      },
    }
  }
  return response
}
