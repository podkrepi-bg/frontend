import { Session } from 'next-auth'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import IndexPage from 'components/index/IndexPage'

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (ctx) => {
  const session = await getSession(ctx)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'index', 'campaigns'])),
      session,
    },
  }
}

export default IndexPage
