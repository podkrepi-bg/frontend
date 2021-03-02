import { GetServerSideProps } from 'next'
import { getSession, Session } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { routes } from 'common/routes'
import ProfilePage from 'components/auth/profile/ProfilePage'

export type ProfilePageProps = { session: Session | null }

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    ctx.res.statusCode = 302
    ctx.res.setHeader('Location', routes.login)
    ctx.res.end()
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common'])),
      session,
    },
  }
}

export default ProfilePage
