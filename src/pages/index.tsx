import { GetServerSideProps } from 'next'
import { getSession, Session } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import IndexPage from 'components/index/IndexPage'

export const getServerSideProps: GetServerSideProps<{ session: Session | null }> = async (ctx) => {
  const session = await getSession(ctx)

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'index'])),
      session,
    },
  }
}

export default IndexPage
