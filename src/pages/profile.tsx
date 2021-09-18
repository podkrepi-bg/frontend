import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ProfilePage from 'components/auth/profile/ProfilePage'

import { parseCookies } from 'nookies'
const parseKeycloakCookies = (ctx: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx)
  return {
    kcToken: cookies['kcToken'] ?? null,
    kcIdToken: cookies['kcIdToken'] ?? null,
  }
}

export type ProfilePageProps = {
  keyCookies: {
    kcToken: string | null
    kcIdToken: string | null
  }
}
export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common'])),
      keyCookies: parseKeycloakCookies(ctx),
    },
  }
}

export default ProfilePage
