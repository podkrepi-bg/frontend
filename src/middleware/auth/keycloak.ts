import getConfig from 'next/config'
import { parseCookies } from 'nookies'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getKeycloakInstance, SSRCookies } from '@react-keycloak/ssr'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { routes } from 'common/routes'

const {
  publicRuntimeConfig: { keycloakConfig },
} = getConfig()

export type ServerCookies = {
  kcToken: string | null
  kcIdToken: string | null
}
export type ServerUser = {
  userToken?: string
  keyCookies: ServerCookies
}

export const parseKeycloakCookies = (ctx: GetServerSidePropsContext): ServerCookies => {
  const cookies = parseCookies(ctx)
  return {
    kcToken: cookies['kcToken'] ?? null,
    kcIdToken: cookies['kcIdToken'] ?? null,
  }
}

export const keycloakInstance = (ctx: GetServerSidePropsContext) => {
  const cookies = parseKeycloakCookies(ctx)
  return getKeycloakInstance(keycloakConfig, SSRCookies(cookies))
}

export const securedProps: GetServerSideProps<ServerUser> = async (ctx) => {
  const cookies = parseKeycloakCookies(ctx)
  const keycloak = getKeycloakInstance(keycloakConfig, SSRCookies(cookies))

  if (!keycloak.token) {
    return {
      redirect: {
        destination: `${routes.login}?pathname=${ctx.req.url}`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      keyCookies: cookies,
      userToken: keycloak.token,
    },
  }
}

export const securedPropsWithTranslation: (
  namespaces?: string[],
) => GetServerSideProps<ServerUser> =
  (namespaces = ['common', 'auth', 'validation']) =>
  async (ctx) => {
    const response = await securedProps(ctx)
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
