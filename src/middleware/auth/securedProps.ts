import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { routes } from 'common/routes'
import { authQueryFnFactory } from 'service/restRequests'

export const securedProps: (
  ctx: GetServerSidePropsContext,
  returnUrl?: string,
) => Promise<GetServerSidePropsResult<Session>> = async (ctx, returnUrl?: string) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: `${routes.login}?callbackUrl=${encodeURIComponent(
          returnUrl ?? ctx.req.url ?? '',
        )}`,
        permanent: false,
      },
    }
  }

  return {
    props: session,
  }
}

export const securedPropsWithTranslation: (
  namespaces?: string[],
  returnUrl?: string,
) => GetServerSideProps<Session> =
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
) => GetServerSideProps<Session> = (namespaces, resolveEndpoint) => async (ctx) => {
  const result = securedPropsWithTranslation(namespaces)
  const response = await result(ctx)
  if ('props' in response) {
    const client = new QueryClient()
    if (resolveEndpoint) {
      const { accessToken } = await response.props
      await client.prefetchQuery(resolveEndpoint(ctx), authQueryFnFactory(accessToken))
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
